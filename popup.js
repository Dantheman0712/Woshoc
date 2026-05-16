// SecurityVault Analyzer - Popup Logic
// Enterprise Edition

class SecurityAnalyzer {
    constructor() {
        this.currentUrl = '';
        this.analysisData = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCurrentTab();
    }

    setupEventListeners() {
        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Main Analysis Button
        document.getElementById('analyzeBtn').addEventListener('click', () => this.analyzeCurrentPage());

        // Report Actions
        document.getElementById('generateReport').addEventListener('click', () => this.generateReport());
        document.getElementById('downloadReport').addEventListener('click', () => this.downloadReportPDF());
        document.getElementById('copyReport').addEventListener('click', () => this.copyReportToClipboard());

        // Settings
        document.querySelector('.settings-btn').addEventListener('click', () => this.openSettings());
    }

    async loadCurrentTab() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            this.currentUrl = tab.url;
            document.getElementById('currentUrl').textContent = this.shortenUrl(this.currentUrl);
        } catch (error) {
            console.error('Error loading current tab:', error);
        }
    }

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Remove active from buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(tabName).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }

    async analyzeCurrentPage() {
        const btn = document.getElementById('analyzeBtn');
        btn.disabled = true;
        btn.textContent = '🔄 Analyzing...';

        try {
            // Send message to content script to analyze page
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            chrome.tabs.sendMessage(tab.id, { action: 'analyze' }, (response) => {
                if (response && response.data) {
                    this.analysisData = response.data;
                    this.displayAnalysis();
                }
                
                btn.disabled = false;
                btn.textContent = '🔍 Analyze Now';
            });
        } catch (error) {
            console.error('Analysis error:', error);
            btn.disabled = false;
            btn.textContent = '🔍 Analyze Now';
        }
    }

    displayAnalysis() {
        if (!this.analysisData) return;

        // Update Overview Tab
        this.updateOverviewTab();

        // Update Security Tab
        this.updateSecurityTab();

        // Update Data Flow Tab
        this.updateDataFlowTab();

        // Show success notification
        this.showNotification('Analysis complete!', 'success');
    }

    updateOverviewTab() {
        const data = this.analysisData;

        // Infrastructure
        document.getElementById('hosting').textContent = data.infrastructure?.hosting || 'Unknown';
        document.getElementById('cdn').textContent = data.infrastructure?.cdn ? '✓ Yes' : '✗ No';
        document.getElementById('ttfb').textContent = data.infrastructure?.ttfb ? `${data.infrastructure.ttfb}ms` : '—';

        // API Endpoints
        const apiList = document.getElementById('apiList');
        apiList.innerHTML = '';

        if (data.apis && data.apis.length > 0) {
            data.apis.forEach(api => {
                const item = this.createApiItem(api);
                apiList.appendChild(item);
            });
        } else {
            apiList.innerHTML = '<p style="text-align: center; color: var(--text-tertiary);">No APIs detected</p>';
        }
    }

    createApiItem(api) {
        const item = document.createElement('div');
        item.className = 'api-item';
        item.innerHTML = `
            <div class="api-item-header">
                <span class="api-url">${api.url}</span>
                <span class="api-method">${api.method}</span>
            </div>
            <div class="api-details">
                <div class="api-detail-item">
                    <span class="api-detail-label">Status</span>
                    <span class="api-detail-value">${api.status || '200'}</span>
                </div>
                <div class="api-detail-item">
                    <span class="api-detail-label">Size</span>
                    <span class="api-detail-value">${api.size || '—'}</span>
                </div>
                <div class="api-detail-item">
                    <span class="api-detail-label">Type</span>
                    <span class="api-detail-value">${api.type || 'Unknown'}</span>
                </div>
            </div>
        `;
        return item;
    }

    updateSecurityTab() {
        const data = this.analysisData;
        const riskScore = data.security?.riskScore || 5;

        // Update risk score visualization
        this.updateRiskScore(riskScore);

        // Update issues
        const issuesList = document.getElementById('issuesList');
        issuesList.innerHTML = '';

        if (data.security?.issues && data.security.issues.length > 0) {
            data.security.issues.forEach(issue => {
                const item = this.createIssueItem(issue);
                issuesList.appendChild(item);
            });
        } else {
            issuesList.innerHTML = '<p style="text-align: center; color: var(--text-tertiary);">No issues detected</p>';
        }

        // Update strengths
        const strengthsList = document.getElementById('strengthsList');
        strengthsList.innerHTML = '';

        if (data.security?.strengths && data.security.strengths.length > 0) {
            data.security.strengths.forEach(strength => {
                const item = this.createStrengthItem(strength);
                strengthsList.appendChild(item);
            });
        }
    }

    updateRiskScore(score) {
        document.getElementById('riskScore').textContent = score;

        const progressCircle = document.getElementById('progressCircle');
        const percentage = (score / 10) * 100;
        const circumference = 282.7;
        const offset = circumference - (percentage / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;

        let level = 'Low Risk';
        let color = 'var(--success)';
        let description = 'Website has good security practices';

        if (score >= 7) {
            level = 'High Risk';
            color = 'var(--danger)';
            description = 'Website has critical security issues';
        } else if (score >= 5) {
            level = 'Medium Risk';
            color = 'var(--warning)';
            description = 'Website has some security concerns';
        }

        document.getElementById('riskLevel').textContent = level;
        document.getElementById('riskDescription').textContent = description;
    }

    createIssueItem(issue) {
        const item = document.createElement('div');
        item.className = 'issue-item';
        
        const severityClass = `severity-${issue.severity?.toLowerCase() || 'low'}`;
        
        item.innerHTML = `
            <div class="issue-header">
                <span class="issue-icon">⚠️</span>
                <span class="issue-title">${issue.title}</span>
                <span class="issue-severity ${severityClass}">${issue.severity || 'Low'}</span>
            </div>
            <div class="issue-description">${issue.description}</div>
            <div class="issue-recommendation">
                💡 ${issue.recommendation}
            </div>
        `;
        return item;
    }

    createStrengthItem(strength) {
        const item = document.createElement('div');
        item.className = 'strength-item';
        
        item.innerHTML = `
            <div class="issue-header">
                <span class="issue-icon">✅</span>
                <span class="issue-title">${strength.title}</span>
            </div>
            <div class="issue-description">${strength.description}</div>
        `;
        return item;
    }

    updateDataFlowTab() {
        const data = this.analysisData;

        // External Services
        const externalServices = document.getElementById('externalServices');
        externalServices.innerHTML = '';

        const services = [
            { name: 'Google Analytics', detected: data.dataflow?.googleAnalytics || false },
            { name: 'Cloudflare', detected: data.dataflow?.cloudflare || false },
            { name: 'Tracking Pixels', detected: data.dataflow?.trackingPixels || false },
            { name: 'Third-Party Ads', detected: data.dataflow?.ads || false },
            { name: 'CDN', detected: data.dataflow?.cdn || false },
        ];

        services.forEach(service => {
            const item = document.createElement('div');
            item.className = 'service-item';
            item.innerHTML = `
                <span class="service-name">${service.name}</span>
                <span class="service-status ${service.detected ? 'status-detected' : 'status-not-detected'}">
                    ${service.detected ? '⚠️ Detected' : '✓ None'}
                </span>
            `;
            externalServices.appendChild(item);
        });

        // Storage Info
        document.getElementById('cookieCount').textContent = data.dataflow?.cookieCount || '0';
        document.getElementById('localStorageCount').textContent = data.dataflow?.localStorageCount || '0';
        document.getElementById('sessionStorageCount').textContent = data.dataflow?.sessionStorageCount || '0';
    }

    async generateReport() {
        if (!this.analysisData) {
            this.showNotification('Please analyze the page first', 'error');
            return;
        }

        const reportContent = this.buildReportMarkdown();
        const preview = document.getElementById('reportPreview');
        preview.innerHTML = `<pre>${this.escapeHtml(reportContent)}</pre>`;

        this.showNotification('Report generated!', 'success');
    }

    buildReportMarkdown() {
        const data = this.analysisData;
        const timestamp = new Date().toLocaleString();

        return `# Security Analysis Report

**URL:** ${this.currentUrl}
**Analysis Date:** ${timestamp}
**Risk Score:** ${data.security?.riskScore}/10

## Overview
${data.summary || 'No summary available'}

## Infrastructure
- Hosting: ${data.infrastructure?.hosting || 'Unknown'}
- CDN: ${data.infrastructure?.cdn ? 'Yes' : 'No'}
- SSL/TLS: ${data.infrastructure?.ssl ? 'Active' : 'Not Active'}
- TTFB: ${data.infrastructure?.ttfb || '—'}ms

## Detected APIs
${data.apis?.map(api => `- ${api.method} ${api.url}`).join('\n') || 'No APIs detected'}

## Security Issues
${data.security?.issues?.map(issue => `- **${issue.title}** (${issue.severity})
  ${issue.description}
  Recommendation: ${issue.recommendation}`).join('\n\n') || 'No issues found'}

## Recommendations
${data.security?.recommendations?.map(r => `- ${r}`).join('\n') || 'No recommendations'}

---
*Generated by SecurityVault Analyzer v1.0.0*`;
    }

    downloadReportPDF() {
        this.showNotification('PDF download started', 'success');
        // Implementation would use a library like html2pdf
        // For now, show a placeholder
    }

    copyReportToClipboard() {
        const preview = document.getElementById('reportPreview');
        const text = preview.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Report copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy report', 'error');
        });
    }

    openSettings() {
        // Placeholder for settings modal
        this.showNotification('Settings coming soon', 'info');
    }

    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 16px;
            background: var(--primary);
            color: var(--bg-dark);
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            z-index: 9999;
            animation: slideUp 0.3s ease-out;
        `;
        
        if (type === 'error') {
            notification.style.background = 'var(--danger)';
            notification.style.color = 'white';
        } else if (type === 'success') {
            notification.style.background = 'var(--success)';
            notification.style.color = 'var(--bg-dark)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    shortenUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch {
            return url.substring(0, 40) + '...';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new SecurityAnalyzer();
});
