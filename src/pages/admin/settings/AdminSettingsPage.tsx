import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Cpu,
  Sparkles,
  Mail,
  HardDrive,
  Save,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader } from '../../../components/admin/layout/PageHeader';
import { Tabs } from '../../../components/admin/common/Tabs';
import { useToast } from '../../../context/ToastContext';

export const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { showToast } = useToast();

  // General Settings
  const [platformName, setPlatformName] = useState('CodeForge Enterprise');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowPublicSignup, setAllowPublicSignup] = useState(true);

  // Security Settings
  const [enforceMFA, setEnforceMFA] = useState(true);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(120);

  // Code Execution Settings
  const [maxExecutionTimeMs, setMaxExecutionTimeMs] = useState(2000);
  const [maxMemoryLimitMb, setMaxMemoryLimitMb] = useState(256);
  const [sandboxDriver, setSandboxDriver] = useState('gVisor (runsc)');

  // AI Settings
  const [aiModel, setAiModel] = useState('Gemini 1.5 Pro (Google DeepMind)');
  const [aiTemperature, setAiTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(4096);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Settings Persisted', 'Configuration synchronized across API gateway and worker clusters.');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security & 2FA', icon: Shield },
    { id: 'execution', label: 'Code Execution Engine', icon: Cpu },
    { id: 'ai', label: 'AI Models & Prompts', icon: Sparkles },
    { id: 'storage', label: 'Storage & DB', icon: HardDrive },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <PageHeader
        title="Platform Configuration & Settings"
        subtitle="Manage global runtime parameters, gVisor container constraints, AI interviewer models, and security governance."
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <form onSubmit={handleSave} className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-soft-sm space-y-6">
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              General Platform Identity
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Platform Name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div>
                  <h4 className="text-xs font-bold text-navy-900 dark:text-white">
                    Maintenance Mode
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Blocks non-admin candidate traffic and suspends submission queue ingestion.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div>
                  <h4 className="text-xs font-bold text-navy-900 dark:text-white">
                    Public Candidate Registration
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Allow new developers to create accounts without invite links.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={allowPublicSignup}
                  onChange={(e) => setAllowPublicSignup(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
              </label>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Staff & Candidate Security Controls
            </h3>

            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
              <div>
                <h4 className="text-xs font-bold text-navy-900 dark:text-white">
                  Mandatory Staff MFA (Multi-Factor Authentication)
                </h4>
                <p className="text-[11px] text-slate-400">
                  Require hardware security keys or authenticator apps for all admin role sessions.
                </p>
              </div>
              <input
                type="checkbox"
                checked={enforceMFA}
                onChange={(e) => setEnforceMFA(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
            </label>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Inactive Session Timeout (Minutes)
              </label>
              <input
                type="number"
                value={sessionTimeoutMinutes}
                onChange={(e) => setSessionTimeoutMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
          </div>
        )}

        {/* Code Execution Tab */}
        {activeTab === 'execution' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Container Sandbox Resource Limits
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Max Execution Time Limit (ms)
                </label>
                <input
                  type="number"
                  value={maxExecutionTimeMs}
                  onChange={(e) => setMaxExecutionTimeMs(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sandbox Memory Cap (MB)
                </label>
                <input
                  type="number"
                  value={maxMemoryLimitMb}
                  onChange={(e) => setMaxMemoryLimitMb(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Isolation Sandbox Runtime Driver
              </label>
              <select
                value={sandboxDriver}
                onChange={(e) => setSandboxDriver(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <option value="gVisor (runsc)">Google gVisor (runsc) - High Security Kernel Interception</option>
                <option value="Firecracker MicroVM">AWS Firecracker MicroVMs - Hypervisor Level</option>
                <option value="Docker Standard">Docker Standard Seccomp / AppArmor</option>
              </select>
            </div>
          </div>
        )}

        {/* AI Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Generative AI Interviewer Engine
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Active Foundation Model
              </label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <option value="Gemini 1.5 Pro (Google DeepMind)">Gemini 1.5 Pro (Google DeepMind) - Best for Code & Math</option>
                <option value="GPT-4o (OpenAI)">GPT-4o (OpenAI) - Fast Audio/Text Reasoning</option>
                <option value="Claude 3.5 Sonnet (Anthropic)">Claude 3.5 Sonnet (Anthropic)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sampling Temperature: {aiTemperature}
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  value={aiTemperature}
                  onChange={(e) => setAiTemperature(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Max Output Generation Tokens
                </label>
                <input
                  type="number"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* Storage Tab */}
        {activeTab === 'storage' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-navy-900 dark:text-white">
              Database & Storage Endpoints
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 font-mono">Primary DB:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">postgres-prod-cluster.internal:5432</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 font-mono">Redis Cache:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">redis-cache-cluster.internal:6379</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 font-mono">RabbitMQ URI:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">amqp://guest:****@rabbitmq-broker:5672</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Persist System Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
