import { Bot } from 'lucide-react';
import { flattenTagGroups, type Project, type TechTagGroup } from './types';

const jarvinTagGroups = [
  {
    label: 'Host service',
    tags: ['Python', 'FastAPI', 'SQLite'],
  },
  {
    label: 'Local AI loop',
    tags: ['llama.cpp', 'Ollama', 'Whisper ASR'],
  },
  {
    label: 'Client surfaces',
    tags: ['React', 'Tauri'],
  },
] satisfies TechTagGroup[];

export const jarvinProject: Project = {
  name: 'Jarvin',
  status: 'Host-run system',
  track: 'Local AI assistant platform',
  audience: 'Personal automation and host-run AI workflows',
  labRole: 'Model-adjacent product engineering',
  labTrack: 'Local AI system',
  deliverySurface:
    'Assistant clients, tool routing, local model workflows, memory, voice loops, and host orchestration.',
  productConstraint:
    'Useful assistants need privacy boundaries, inspectable tools, persistent memory, and clients that make local model work feel practical.',
  summary:
    'A private host-run assistant platform around local models, voice workflows, memory, safe tools, integrations, planning, and shared desktop/mobile clients.',
  details:
    'Jarvin is not a custom foundation model; it demonstrates the product software around local models: voice, memory, tools, integrations, and proactive assistant behavior that can be evaluated and owned.',
  proof: [
    {
      label: 'Local host',
      text: 'A FastAPI service started from the trusted machine owns ASR, local LLM routing, TTS, persistence, integrations, and frontend serving.',
    },
    {
      label: 'Voice loop',
      text: 'Remote phone voice captures microphone audio, uploads it for host transcription, routes the turn through chat/tools, and plays reply audio on the client.',
    },
    {
      label: 'Client surfaces',
      text: 'A shared React shell powers the browser app, Tauri desktop app, and Tauri Android shell without splitting product UI into separate codebases.',
    },
    {
      label: 'Tool domains',
      text: 'Deterministic planners and tools handle weather, reminders, routines, workspace/repo tasks, web research, calendar actions, and daily briefs.',
    },
  ],
  repositorySignals: [
    {
      label: 'Assistant boundary',
      text: 'Natural-language flexibility is routed through constrained planners so side effects can stay inspectable, confirmable, and host-controlled.',
    },
    {
      label: 'Persistence',
      text: 'SQLite stores conversation, profile, reminder, and routine state on the host, keeping clients thin and replaceable.',
    },
    {
      label: 'Local model layer',
      text: 'llama.cpp and optional Ollama backends sit behind a runtime router, with Whisper ASR and local TTS completing the voice path.',
    },
  ],
  nextSteps: [
    {
      label: 'Next build',
      text: 'The next meaningful work is research: better planning loops, clearer tool-evaluation boundaries, and stronger tests for instruction following.',
    },
    {
      label: 'Blocker',
      text: 'Local model quality is the main constraint. Stronger GPUs would make larger local LLMs practical and reduce the amount of product logic spent compensating for weak instruction following.',
    },
    {
      label: 'Product path',
      text: 'The platform can become more useful by tightening the assistant loop around reliable memory, voice behavior, and controlled tool execution rather than chasing novelty.',
    },
  ],
  tags: flattenTagGroups(jarvinTagGroups),
  tagGroups: jarvinTagGroups,
  href: 'https://github.com/AdamWentworth/Jarvin',
  icon: Bot,
  accent: 'jarvin',
  brand: {
    alt: 'Jarvin',
    icon: '/products/jarvin/jarvin-icon-clean.png',
    iconFrame: 'dark',
    lockupFrame: 'dark',
    wordmark: '/products/jarvin/jarvin-wordmark-white.png',
    darkLockup: '/products/jarvin/jarvin-lockup-dark.png',
  },
  demo: {
    kind: 'jarvin',
    label: 'Host-run assistant loop',
    metric: 'Local-first AI',
    summary:
      'A private assistant surface for chat, voice, local model routing, host-task approval, diagnostics, and memory-backed workspace state.',
    steps: ['Open assistant workspace', 'Approve host tasks', 'Review voice and host settings'],
    scenes: [
      {
        label: 'Assistant workspace',
        text: 'Move through persistent conversations, typed requests, weather-backed briefs, model controls, and local host status.',
      },
      {
        label: 'Host task guardrails',
        text: 'Review read/write intent, risk, details, and proposed execution steps before Jarvin touches local project state.',
      },
      {
        label: 'Settings depth',
        text: 'Inspect host URL, LLM backend, voice devices, profile preferences, notifications, diagnostics, and action logs.',
      },
    ],
  },
};
