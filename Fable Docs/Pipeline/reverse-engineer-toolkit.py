#!/usr/bin/env python3
"""
A360 Reverse Engineering Toolkit
Extract, analyze, and compare web app bundles against your own implementation.

Usage:
  python3 reverse-engineer-toolkit.py --path /path/to/heidi/download --output results.json
  
Then compare:
  python3 reverse-engineer-toolkit.py --compare results.json a360-impl.json
"""

import json
import re
import sys
import argparse
from pathlib import Path
from collections import defaultdict
from dataclasses import dataclass, asdict
from typing import Dict, List, Set, Tuple, Optional

@dataclass
class ComponentPattern:
    """A detected UI component or pattern"""
    name: str
    module_id: Optional[str] = None
    file_path: Optional[str] = None
    classnames: List[str] = None
    event_handlers: List[str] = None
    api_calls: List[str] = None
    state_hooks: List[str] = None
    html_elements: List[str] = None
    evidence: Dict = None  # raw text snippets where found
    
    def __post_init__(self):
        if self.classnames is None:
            self.classnames = []
        if self.event_handlers is None:
            self.event_handlers = []
        if self.api_calls is None:
            self.api_calls = []
        if self.state_hooks is None:
            self.state_hooks = []
        if self.html_elements is None:
            self.html_elements = []
        if self.evidence is None:
            self.evidence = {}

@dataclass
class BundleAnalysis:
    """Complete analysis of a compiled bundle"""
    timestamp: str
    source_path: str
    components: Dict[str, ComponentPattern]
    tailwind_classes: Dict[str, int]  # class → frequency
    css_variables: Set[str]
    api_endpoints: Set[str]
    analytics_events: Set[str]
    data_flow: Dict  # describes the request/response patterns
    design_tokens: Dict  # colors, spacing, typography
    user_flows: List[Dict]  # documented user journeys
    

class ReverseEngineer:
    """Main toolkit for analyzing minified bundles"""
    
    def __init__(self, verbose=False):
        self.verbose = verbose
        self.components = {}
        self.all_strings = set()
        
    def analyze_bundle(self, bundle_path: str) -> BundleAnalysis:
        """Full analysis pipeline on a minified JavaScript bundle"""
        print(f"[RE] Analyzing {Path(bundle_path).name}...")
        
        content = self._read_file(bundle_path)
        
        # Extract all strings
        self.all_strings = self._extract_strings(content)
        
        # Identify components
        components = self._find_components(content)
        
        # Extract patterns
        tailwind_classes = self._extract_tailwind(content)
        css_vars = self._extract_css_variables(content)
        apis = self._extract_api_endpoints(content)
        analytics = self._extract_analytics_events(content)
        data_flow = self._analyze_data_flow(content)
        design_tokens = self._extract_design_tokens(content)
        user_flows = self._infer_user_flows(apis, data_flow)
        
        return BundleAnalysis(
            timestamp=self._timestamp(),
            source_path=str(bundle_path),
            components=components,
            tailwind_classes=tailwind_classes,
            css_variables=css_vars,
            api_endpoints=apis,
            analytics_events=analytics,
            data_flow=data_flow,
            design_tokens=design_tokens,
            user_flows=user_flows,
        )
    
    def _read_file(self, path: str) -> str:
        """Safely read file with fallback encoding"""
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return f.read()
        except UnicodeDecodeError:
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()
    
    def _extract_strings(self, content: str) -> Set[str]:
        """Extract all string literals > 10 chars (filters noise)"""
        # Pattern: "..." or '...' with escaped quotes
        pattern = r'''["']([^"'\\]{10,300})["']'''
        strings = set(re.findall(pattern, content))
        return {s for s in strings if not s.startswith(('\\', 'd', 'm0', 'm1', 'M0', 'M1'))}
    
    def _find_components(self, content: str) -> Dict[str, ComponentPattern]:
        """Identify component definitions and their patterns"""
        components = {}
        
        # Common React/component names
        component_patterns = [
            'Input', 'Button', 'Card', 'Modal', 'Citation', 'Evidence', 'Answer',
            'Source', 'Suggestions', 'Chat', 'Stream', 'References', 'Chip',
            'Grid', 'Form', 'List', 'Avatar', 'Badge', 'Alert', 'Toast',
            'Drawer', 'Dialog', 'Sheet', 'Popover', 'Tooltip', 'Menu',
        ]
        
        for comp_name in component_patterns:
            # Look for module definitions like "72772:(e,t,n)=>{...ComponentName...}"
            pattern = rf'(\d+):\(e,t,n\)=>\{{[^}}]{{0,3000}}{re.escape(comp_name)}[^}}]{{0,3000}}\}}'
            match = re.search(pattern, content)
            
            if match:
                module_id = match.group(1)
                module_code = match.group(0)
                
                component = ComponentPattern(
                    name=comp_name,
                    module_id=module_id,
                    classnames=self._extract_from_text(module_code, 'className'),
                    event_handlers=self._extract_from_text(module_code, 'on(?:Click|Change|Submit|Blur|Focus)'),
                    api_calls=self._extract_from_text(module_code, 'fetch|axios|POST|GET'),
                    state_hooks=self._extract_from_text(module_code, 'useState|useReducer|useContext'),
                    html_elements=self._extract_from_text(module_code, r'<(div|button|input|form|textarea|span)'),
                    evidence={'snippet': module_code[:500]}
                )
                components[comp_name] = component
        
        return components
    
    def _extract_from_text(self, text: str, pattern: str) -> List[str]:
        """Extract matches from text, deduplicated"""
        matches = re.findall(pattern, text, re.IGNORECASE)
        return list(dict.fromkeys(matches))  # deduplicate preserving order
    
    def _extract_tailwind(self, content: str) -> Dict[str, int]:
        """Count Tailwind utility classes"""
        # Pattern: px-4, py-3, text-sm, gap-2.5, rounded-xl, etc.
        pattern = r'\b((?:[a-z]+-)?(?:\d+|full|auto|none|transparent|current|inherit)[a-z0-9\-\.]*)\b'
        matches = re.findall(pattern, content)
        
        # Filter to likely Tailwind (has px|py|text|gap|rounded|border|shadow|bg|flex etc.)
        tailwind_prefixes = [
            'px', 'py', 'pt', 'pb', 'pl', 'pr', 'p', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'm',
            'text', 'font', 'gap', 'rounded', 'border', 'shadow', 'bg', 'flex', 'grid', 'w', 'h',
            'max', 'min', 'opacity', 'duration', 'ease', 'transition', 'transform', 'scale',
            'rotate', 'translate', 'skew', 'absolute', 'relative', 'fixed', 'sticky', 'block',
            'inline', 'hidden', 'visible', 'overflow', 'truncate', 'line', 'whitespace',
        ]
        
        classes = {}
        for match in matches:
            if any(match.startswith(prefix) for prefix in tailwind_prefixes):
                classes[match] = classes.get(match, 0) + 1
        
        return dict(sorted(classes.items(), key=lambda x: x[1], reverse=True))
    
    def _extract_css_variables(self, content: str) -> Set[str]:
        """Find CSS custom properties (--color-*, --spacing-*, etc.)"""
        pattern = r'\bvar\((-{2}[a-z0-9\-]+)\)'
        vars_found = set(re.findall(pattern, content))
        return vars_found
    
    def _extract_api_endpoints(self, content: str) -> Set[str]:
        """Find API endpoint patterns"""
        patterns = [
            r'["\'](/api/[a-z0-9/\-]+)["\']',
            r'["\'](https?://[^"\']{10,100})["\']',
        ]
        endpoints = set()
        for pattern in patterns:
            endpoints.update(re.findall(pattern, content))
        
        # Filter to likely endpoints
        return {ep for ep in endpoints if '/api/' in ep or 'http' in ep}
    
    def _extract_analytics_events(self, content: str) -> Set[str]:
        """Find analytics event names (GTM, segment, etc.)"""
        pattern = r'event["\']?\s*:\s*["\']([a-z_][a-z0-9_]*)["\']'
        events = set(re.findall(pattern, content, re.IGNORECASE))
        # Common patterns
        for s in list(self.all_strings):
            if 'event' in s.lower() or any(x in s.lower() for x in ['unauth', 'sent', 'click', 'view', 'conversion']):
                if s.islower() or '_' in s:
                    events.add(s)
        return events
    
    def _analyze_data_flow(self, content: str) -> Dict:
        """Infer request/response data shapes"""
        flow = {
            'request_body_keys': [],
            'response_event_types': [],
            'streaming_indicators': [],
            'state_management': [],
        }
        
        # Look for object keys
        for s in self.all_strings:
            if s in ['question', 'query', 'input', 'message', 'text', 'prompt', 'session_id', 'surface']:
                flow['request_body_keys'].append(s)
            if s in ['status', 'sources', 'tokens', 'token', 'citations', 'done', 'error', 'complete']:
                flow['response_event_types'].append(s)
            if any(x in s.lower() for x in ['stream', 'sse', 'event', 'chunk', 'buffer']):
                flow['streaming_indicators'].append(s)
        
        # SSE or streaming patterns
        has_sse = 'EventSource' in content or 'ReadableStream' in content
        has_fetch_stream = 'reader()' in content or '.getReader()' in content
        
        flow['_indicators'] = {
            'has_sse': has_sse,
            'has_fetch_stream': has_fetch_stream,
            'likely_streaming': has_sse or has_fetch_stream,
        }
        
        return flow
    
    def _extract_design_tokens(self, content: str) -> Dict:
        """Extract colors, spacing, typography values"""
        tokens = {
            'colors': set(),
            'spacing': set(),
            'typography': set(),
            'shadows': set(),
            'borders': set(),
        }
        
        # Spacing: px-4, gap-2.5, py-3, etc.
        spacing = set(re.findall(r'((?:px|py|pt|pb|pl|pr|p|m|gap|w|h)-[a-z0-9\.]+)', content))
        tokens['spacing'].update(spacing)
        
        # Colors: text-*, bg-*, border-*
        colors = set(re.findall(r'((?:text|bg|border|ring|shadow|fill|stroke)-[a-z0-9\-]+)', content))
        tokens['colors'].update(colors)
        
        # Typography: text-sm, font-medium, etc.
        typo = set(re.findall(r'((?:text|font|leading|tracking)-[a-z0-9\-]+)', content))
        tokens['typography'].update(typo)
        
        # Shadows: shadow-sm, etc.
        shadows = set(re.findall(r'(shadow-[a-z0-9\-]*)', content))
        tokens['shadows'].update(shadows)
        
        # Borders: rounded-xl, border-*
        borders = set(re.findall(r'((?:rounded|border)-[a-z0-9\-]+)', content))
        tokens['borders'].update(borders)
        
        return {k: sorted(list(v)) for k, v in tokens.items()}
    
    def _infer_user_flows(self, apis: Set[str], data_flow: Dict) -> List[Dict]:
        """Document inferred user journeys"""
        flows = []
        
        if '/api/ask' in apis or '/api/chat' in apis:
            flows.append({
                'name': 'Ask Question',
                'steps': [
                    'User types question in input',
                    'User presses Enter or taps Submit',
                    f'POST to {[a for a in apis if "ask" in a or "chat" in a][0] if apis else "/api/ask"}',
                    'SSE stream begins (status → sources → tokens → citations → done)',
                    'Prose renders with inline citation markers [1][2]',
                    'Sources array resolves [1] → link + color (tier)',
                    'User clicks citation → opens source URL',
                ],
                'involves_streaming': data_flow.get('_indicators', {}).get('likely_streaming', False),
                'involves_persistence': 'session' in str(data_flow),
            })
        
        flows.append({
            'name': 'Suggest Follow-up',
            'steps': [
                'Answer completes',
                'Suggested next questions appear',
                'User taps one suggestion',
                'Same flow as Ask Question (auto-seeded question)',
            ],
        })
        
        if 'signup' in str(data_flow) or 'login' in str(data_flow):
            flows.append({
                'name': 'Convert to Account',
                'steps': [
                    'After N answers, soft CTA appears',
                    'User taps "Sign up" or "Log in"',
                    'Modal or new page opens',
                    'Capture email + password / OAuth',
                    'Create session',
                ],
            })
        
        return flows
    
    def _timestamp(self) -> str:
        from datetime import datetime
        return datetime.now().isoformat()
    
    def save_results(self, analysis: BundleAnalysis, output_path: str) -> None:
        """Save analysis to JSON file"""
        # Convert to JSON-serializable format
        data = {
            'timestamp': analysis.timestamp,
            'source': analysis.source_path,
            'components': {
                name: {
                    'module_id': comp.module_id,
                    'classnames': comp.classnames,
                    'event_handlers': comp.event_handlers,
                    'api_calls': comp.api_calls,
                    'state_hooks': comp.state_hooks,
                    'html_elements': comp.html_elements,
                }
                for name, comp in analysis.components.items()
            },
            'design_tokens': analysis.design_tokens,
            'tailwind_classes': analysis.tailwind_classes,
            'css_variables': sorted(list(analysis.css_variables)),
            'api_endpoints': sorted(list(analysis.api_endpoints)),
            'analytics_events': sorted(list(analysis.analytics_events)),
            'data_flow': analysis.data_flow,
            'user_flows': analysis.user_flows,
        }
        
        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"[✓] Results saved to {output_path}")
    
    def compare_implementations(self, reference_path: str, implementation_path: str) -> Dict:
        """Compare two analysis results and generate a coverage report"""
        with open(reference_path) as f:
            reference = json.load(f)
        with open(implementation_path) as f:
            implementation = json.load(f)
        
        comparison = {
            'reference_source': reference.get('source'),
            'implementation_source': implementation.get('source'),
            'coverage': {},
            'gaps': {},
            'extras': {},
        }
        
        # Compare components
        ref_comps = set(reference.get('components', {}).keys())
        impl_comps = set(implementation.get('components', {}).keys())
        
        comparison['coverage']['components'] = {
            'found': list(ref_comps & impl_comps),
            'count': len(ref_comps & impl_comps),
            'percentage': len(ref_comps & impl_comps) / len(ref_comps) * 100 if ref_comps else 0,
        }
        comparison['gaps']['components'] = list(ref_comps - impl_comps)
        comparison['extras']['components'] = list(impl_comps - ref_comps)
        
        # Compare design tokens
        for token_type in ['colors', 'spacing', 'typography', 'shadows', 'borders']:
            ref_tokens = set(reference.get('design_tokens', {}).get(token_type, []))
            impl_tokens = set(implementation.get('design_tokens', {}).get(token_type, []))
            
            comparison['coverage'][f'tokens_{token_type}'] = len(ref_tokens & impl_tokens)
            comparison['gaps'][f'tokens_{token_type}'] = list(ref_tokens - impl_tokens)
        
        # Compare API endpoints
        ref_apis = set(reference.get('api_endpoints', []))
        impl_apis = set(implementation.get('api_endpoints', []))
        
        comparison['coverage']['apis'] = {
            'found': list(ref_apis & impl_apis),
            'count': len(ref_apis & impl_apis),
        }
        comparison['gaps']['apis'] = list(ref_apis - impl_apis)
        comparison['extras']['apis'] = list(impl_apis - ref_apis)
        
        # Summary
        comparison['summary'] = {
            'total_reference_components': len(ref_comps),
            'total_impl_components': len(impl_comps),
            'match_percentage': (len(ref_comps & impl_comps) / len(ref_comps) * 100) if ref_comps else 0,
        }
        
        return comparison


def main():
    parser = argparse.ArgumentParser(description='A360 Reverse Engineering Toolkit')
    parser.add_argument('--path', help='Path to downloaded/extracted bundle directory')
    parser.add_argument('--file', help='Single bundle file to analyze')
    parser.add_argument('--output', default='reverse-engineer-results.json', help='Output JSON file')
    parser.add_argument('--compare', nargs=2, help='Compare two result files: --compare file1.json file2.json')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    toolkit = ReverseEngineer(verbose=args.verbose)
    
    if args.compare:
        # Compare mode
        print(f"\n[COMPARE] {args.compare[0]} vs {args.compare[1]}\n")
        comparison = toolkit.compare_implementations(args.compare[0], args.compare[1])
        
        print("=" * 80)
        print("COMPONENT COVERAGE")
        print("=" * 80)
        comp_cov = comparison['coverage'].get('components', {})
        print(f"Found:     {comp_cov.get('count', 0)}/{comparison['summary']['total_reference_components']} ({comp_cov.get('percentage', 0):.1f}%)")
        if comparison['gaps']['components']:
            print(f"Gaps:      {', '.join(comparison['gaps']['components'][:5])}{'...' if len(comparison['gaps']['components']) > 5 else ''}")
        if comparison['extras']['components']:
            print(f"Extras:    {', '.join(comparison['extras']['components'][:5])}")
        
        print("\n" + "=" * 80)
        print("API ENDPOINTS")
        print("=" * 80)
        api_cov = comparison['coverage'].get('apis', {})
        print(f"Found:     {api_cov.get('count', 0)} / {len(comparison['gaps']['apis']) + api_cov.get('count', 0)}")
        if comparison['gaps']['apis']:
            print(f"Gaps:      {', '.join(comparison['gaps']['apis'])}")
        if comparison['extras']['apis']:
            print(f"Extras:    {', '.join(comparison['extras']['apis'])}")
        
        print("\n" + "=" * 80)
        print("DESIGN TOKENS (TAILWIND)")
        print("=" * 80)
        for token_type in ['colors', 'spacing', 'typography', 'shadows', 'borders']:
            gap_count = len(comparison['gaps'].get(f'tokens_{token_type}', []))
            if gap_count > 0:
                print(f"{token_type:15} Gaps: {', '.join(comparison['gaps'][f'tokens_{token_type}'][:3])}{'...' if gap_count > 3 else ''}")
        
        # Save comparison
        with open(args.output.replace('.json', '_comparison.json'), 'w') as f:
            json.dump(comparison, f, indent=2)
        print(f"\n[✓] Comparison saved to {args.output.replace('.json', '_comparison.json')}")
    
    elif args.file:
        # Single file mode
        analysis = toolkit.analyze_bundle(args.file)
        toolkit.save_results(analysis, args.output)
        
        print("\n" + "=" * 80)
        print("ANALYSIS SUMMARY")
        print("=" * 80)
        print(f"Components found:     {len(analysis.components)}")
        print(f"Tailwind classes:     {len(analysis.tailwind_classes)}")
        print(f"CSS variables:        {len(analysis.css_variables)}")
        print(f"API endpoints:        {len(analysis.api_endpoints)}")
        print(f"Analytics events:     {len(analysis.analytics_events)}")
        print(f"User flows inferred:  {len(analysis.user_flows)}")
        print(f"\nAPIs: {', '.join(list(analysis.api_endpoints)[:3])}")
        print(f"Events: {', '.join(list(analysis.analytics_events)[:3])}")
    
    elif args.path:
        # Directory mode: analyze all .js files
        bundle_dir = Path(args.path) / 'scripts'
        if not bundle_dir.exists():
            print(f"Error: {bundle_dir} not found")
            return 1
        
        js_files = list(bundle_dir.glob('*.js'))
        print(f"Found {len(js_files)} JavaScript bundles\n")
        
        all_results = {
            'timestamp': toolkit._timestamp(),
            'source_directory': args.path,
            'bundles_analyzed': [],
        }
        
        for js_file in sorted(js_files)[:10]:  # Analyze first 10 (largest ones)
            analysis = toolkit.analyze_bundle(str(js_file))
            all_results['bundles_analyzed'].append({
                'file': js_file.name,
                'components': list(analysis.components.keys()),
                'api_endpoints': list(analysis.api_endpoints),
                'design_tokens_count': sum(len(v) for v in analysis.design_tokens.values()),
            })
        
        # Aggregate
        print("\n" + "=" * 80)
        print("AGGREGATED FINDINGS")
        print("=" * 80)
        
        for item in all_results['bundles_analyzed']:
            if item['components']:
                print(f"\n{item['file']}")
                print(f"  Components: {', '.join(item['components'][:5])}")
                print(f"  APIs:       {', '.join(item['api_endpoints'][:3])}")
        
        with open(args.output, 'w') as f:
            json.dump(all_results, f, indent=2)
        
        print(f"\n[✓] Results saved to {args.output}")
    
    else:
        parser.print_help()
        return 1
    
    return 0


if __name__ == '__main__':
    sys.exit(main())
