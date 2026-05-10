// Minimal abstract glyphs for tools simple-icons doesn't ship (brand-license reasons).
// 24x24 viewBox, single-path; designed to read as a recognizable mark, not a brand logo.

export interface IconData {
  title: string;
  path: string;
  hex: string;
}

export const customIcons: Record<string, IconData> = {
  tableau: {
    title: 'Tableau',
    hex: 'E97627',
    // 4 dashes in a plus-sign arrangement — Tableau's signature mark
    path: 'M11 2h2v5h-2zM11 17h2v5h-2zM2 11h5v2H2zM17 11h5v2h-5zM11 8h2v8h-2zM8 11h8v2H8z',
  },
  powerbi: {
    title: 'Power BI',
    hex: 'F2C811',
    // ascending bars
    path: 'M3 21V13h4v8H3zm6 0V8h4v13H9zm6 0V3h4v18h-4z',
  },
  aws: {
    title: 'AWS',
    hex: 'FF9900',
    // stylized cloud + arrow
    path: 'M6 17a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0118 17H6zm5 4l-3-3h2v-3h2v3h2l-3 3z',
  },
  azure: {
    title: 'Azure',
    hex: '0078D4',
    // triangular A
    path: 'M12 3L3 21h6l3-7 3 7h6L12 3zm0 4.5L14.5 14h-5L12 7.5z',
  },
  vscode: {
    title: 'VS Code',
    hex: '007ACC',
    // angular ribbon
    path: 'M17 2l4 2v16l-4 2-9-7-5 4-2-1 4-6-4-6 2-1 5 4 9-7zm-1 5L9 12l7 5V7z',
  },
  excel: {
    title: 'Excel',
    hex: '217346',
    // grid + X
    path: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3h2l2 3 2-3h2l-3 4 3 4h-2l-2-3-2 3H8l3-4-3-4z',
  },
  openai: {
    title: 'OpenAI',
    hex: '74AA9C',
    // hexagonal mark abstraction
    path: 'M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3L18.7 8 12 11.7 5.3 8 12 4.3zM5 9.7l6 3.3v6.7l-6-3.3V9.7zm14 0v6.7l-6 3.3V13l6-3.3z',
  },
  saphana: {
    title: 'SAP HANA',
    hex: '0FAAFF',
    // stylized "H" + cube
    path: 'M3 4h4v7h10V4h4v16h-4v-5H7v5H3V4z',
  },
};
