// SecurityVault - Content Script
// Data collection from the analyzed page

class PageAnalyzer {
    constructor() {
        this.data = {
            url: window.location.href,
            infrastructure: {},
            apis: [],
            security: {
                riskScore: 5,
                issues: [],
                strengths: [],
            },
            dataflow: {
                googleAnalytics: false,
                cloudflare: false,
                trackingPixels: 0,
                ads: false,
                cdn: false,
                cookieCount: 0,
                localStorageCount: 0,
                sessionStorageCount: 0,
            }
        };
    }

    analyze() {
        this.analyzeDOM();
        this.analyzeScripts();
        this.analyzeMeta();
        this.analyzeSecurityHeaders();
        this.analyzeStorage();
        this.analyzeExternalServices();
        this.calculateRiskScore();
        return this.data;
    }

    analyzeDOM() {
        // Find tracking pixels
        const pixels = document.querySelectorAll('img[src*="pixel"], img[src*="track"]');
        this.data.dataflow.trackingPixels = pixels.length;

        // Find ad networks
        const adScripts = document.querySelectorAll(
            'script[src*="ads"], script[src*="doubleclick"], script[src*="googleadservices"]'
        );
        this.data.dataflow.ads = adScripts.length > 0;
    }

    analyzeScripts() {
        const scripts = document.querySelectorAll('script[src]');
        const detectedServices = new Set();

        scripts.forEach(script => {
            const src = script.src;

            // Detect services
            if (src.includes('google-analytics') || src.includes('ga.js')) {
                detectedServices.add('Google Analytics');
                this.data.dataflow.googleAnalytics = true;
            }
            if (src.includes('cloudflare')) {
                detectedServices.add('Cloudflare');
                this.data.dataflow.cloudflare = true;
            }
            if (src.includes('cdn')) {
                detectedServices.add('CDN');
                this.data.dataflow.cdn = true;
            }

            // Log external scripts
            try {
                const url = new URL(src);
                if (url.hostname !== window.location.hostname) {
                    this.data.apis.push({
                        url: url.hostname,
                        type: 'External Script',
                        method: 'GET',
                    });
                }
            } catch (e) {
                // Invalid URL
            }
        });
    }

    analyzeMeta() {
        // Check security meta tags
        const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        const xframe = document.querySelector('meta[http-equiv="X-UA-Compatible"]');
        
        if (!csp) {
            this.data.security.issues.push({
                title: 'Missing Content Security Policy',
                description: 'No CSP meta tag detected',
                severity: 'Medium',
                recommendation: 'Add CSP headers to prevent XSS attacks'
            });
        } else {
            this.data.security.strengths.push({
                title: 'Content Security Policy',
                description: 'CSP is configured'
            });
        }

        // Check viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            this.data.security.strengths.push({
                title: 'Responsive Design',
                description: 'Viewport meta tag properly configured'
            });
        }
    }

    analyzeSecurityHeaders() {
        // Note: Content scripts can't directly access response headers
        // This would need background script to check via fetch
        
        // Check for common security issues
        const forms = document.querySelectorAll('form');
        let insecureForms = 0;

        forms.forEach(form => {
            if (form.method.toUpperCase() === 'GET' && form.action) {
                insecureForms++;
            }
        });

        if (insecureForms > 0) {
            this.data.security.issues.push({
                title: 'Insecure Form Methods',
                description: `Found ${insecureForms} forms using GET method`,
                severity: 'Low',
                recommendation: 'Use POST method for sensitive data'
            });
        }

        // Check for HTTPS
        if (window.location.protocol === 'https:') {
            this.data.security.strengths.push({
                title: 'HTTPS Enabled',
                description: 'Page is served over secure HTTPS'
            });
        } else {
            this.data.security.issues.push({
                title: 'No HTTPS',
                description: 'Page is not served over HTTPS',
                severity: 'High',
                recommendation: 'Enable HTTPS for all pages'
            });
        }
    }

    analyzeStorage() {
        // Count cookies
        const cookies = document.cookie.split(';').filter(c => c.trim());
        this.data.dataflow.cookieCount = cookies.length;

        // Check for cookies
        if (cookies.length > 0) {
            this.data.security.issues.push({
                title: 'Cookies Found',
                description: `${cookies.length} cookies detected`,
                severity: 'Low',
                recommendation: 'Review cookie usage for compliance (GDPR/CCPA)'
            });
        } else {
            this.data.security.strengths.push({
                title: 'No Cookies',
                description: 'No cookies set on this page'
            });
        }

        // Try to detect localStorage usage
        try {
            const lsLength = Object.keys(localStorage).length;
            this.data.dataflow.localStorageCount = lsLength;
        } catch (e) {
            // localStorage not available
        }

        // Try to detect sessionStorage usage
        try {
            const ssLength = Object.keys(sessionStorage).length;
            this.data.dataflow.sessionStorageCount = ssLength;
        } catch (e) {
            // sessionStorage not available
        }
    }

    analyzeExternalServices() {
        // Check for known external services in window object
        if (window.gtag || window.ga) {
            this.data.dataflow.googleAnalytics = true;
        }

        if (window.CF) {
            this.data.dataflow.cloudflare = true;
        }

        // Detect fetch/XHR to external domains (if possible)
        this.detectExternalApis();
    }

    detectExternalApis() {
        // Intercept fetch calls
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            const url = typeof args[0] === 'string' ? args[0] : args[0].url;
            
            try {
                const urlObj = new URL(url, window.location.origin);
                if (urlObj.hostname !== window.location.hostname) {
                    // External API
                }
            } catch (e) {
                // Ignore
            }
            
            return originalFetch.apply(this, args);
        };
    }

    calculateRiskScore() {
        let score = 2; // Start with low score

        // Add points for issues
        this.data.security.issues.forEach(issue => {
            if (issue.severity === 'High') score += 3;
            else if (issue.severity === 'Medium') score += 2;
            else score += 1;
        });

        // Subtract points for strengths
        this.data.security.strengths.forEach(() => {
            score = Math.max(0, score - 0.5);
        });

        // Add points for external services
        if (this.data.dataflow.googleAnalytics) score += 1;
        if (this.data.dataflow.cloudflare) score += 0.5;
        if (this.data.dataflow.trackingPixels > 0) score += 1;

        this.data.security.riskScore = Math.min(10, Math.round(score * 10) / 10);
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyze') {
        const analyzer = new PageAnalyzer();
        const analysisResult = analyzer.analyze();
        
        sendResponse({
            success: true,
            data: analysisResult
        });
    }
});

// Initial page load analysis (optional)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Page is ready
    });
}
