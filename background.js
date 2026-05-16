// SecurityVault - Background Service Worker
// Network monitoring & advanced analysis

class AnalysisEngine {
    constructor() {
        this.networkLog = [];
        this.detectedServices = new Map();
        this.apiEndpoints = [];
        this.setupListeners();
    }

    setupListeners() {
        // Listen for messages from popup/content scripts
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'getNetworkLog') {
                sendResponse({ data: this.networkLog });
            } else if (request.action === 'detectServices') {
                sendResponse({ data: this.detectedServices });
            }
        });

        // Monitor tab updates
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.status === 'complete') {
                // Reset analysis for new page
                this.networkLog = [];
                this.detectedServices.clear();
                this.apiEndpoints = [];
            }
        });
    }

    // Analyze response headers for security information
    async analyzeResponseHeaders(tabId) {
        try {
            const details = await chrome.webRequest.onHeadersReceived.addListener(
                (details) => {
                    if (details.tabId !== tabId) return;

                    this.analyzeHeaders(details.responseHeaders, details.url);
                },
                { urls: ['<all_urls>'] },
                ['responseHeaders']
            );
        } catch (error) {
            console.log('Error analyzing headers:', error);
        }
    }

    analyzeHeaders(headers, url) {
        const headerMap = {};

        headers.forEach(header => {
            headerMap[header.name.toLowerCase()] = header.value;
        });

        // Check for security headers
        if (!headerMap['content-security-policy']) {
            // CSP missing
        }

        if (!headerMap['x-frame-options']) {
            // X-Frame-Options missing
        }

        if (!headerMap['strict-transport-security']) {
            // HSTS missing
        }

        // Detect hosting provider from headers
        if (headerMap['server']) {
            this.detectHosting(headerMap['server']);
        }

        if (headerMap['cf-ray']) {
            this.detectedServices.set('cloudflare', true);
        }
    }

    detectHosting(serverHeader) {
        const hosting = {
            'cloudflare': 'Cloudflare',
            'nginx': 'Nginx',
            'apache': 'Apache',
            'microsoft-iis': 'IIS',
            'aws': 'AWS',
            'heroku': 'Heroku',
            'vercel': 'Vercel',
            'netlify': 'Netlify',
        };

        for (const [key, value] of Object.entries(hosting)) {
            if (serverHeader.toLowerCase().includes(key)) {
                this.detectedServices.set('hosting', value);
                break;
            }
        }
    }

    // Generate analysis summary
    generateSummary() {
        return {
            totalRequests: this.networkLog.length,
            externalRequests: this.apiEndpoints.length,
            detectedServices: Array.from(this.detectedServices.entries()),
        };
    }
}

// Initialize analysis engine
const engine = new AnalysisEngine();

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    chrome.windows.create({
        url: 'popup.html',
        type: 'popup',
        width: 420,
        height: 800
    });
});

// API to get stored analysis data
function getAnalysisData(callback) {
    chrome.storage.local.get(['analysisData'], (result) => {
        callback(result.analysisData);
    });
}

// API to save analysis data
function saveAnalysisData(data) {
    chrome.storage.local.set({ analysisData: data });
}

// Utility: Check if a URL is external
function isExternalUrl(url, pageUrl) {
    try {
        const currentDomain = new URL(pageUrl).hostname;
        const checkDomain = new URL(url).hostname;
        return currentDomain !== checkDomain;
    } catch {
        return false;
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnalysisEngine };
}
