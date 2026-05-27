import {
  siPython, siJupyter, siPandas, siNumpy, siScikitlearn, siTensorflow, siPytorch,
  siKeras, siHuggingface, siMlflow, siApachespark, siApacheairflow, siR,
  siPlotly, siStreamlit,
  siMysql, siPostgresql, siSnowflake, siDatabricks, siGooglecloud,
  siDocker, siGit, siGithub, siLinux, siMarkdown, siNotion, siJira,
  siKaggle, siAnaconda,
} from 'simple-icons';
import { customIcons } from '~/lib/custom-icons';

export interface ToolEntry {
  title: string;
  path: string;
  hex: string;
}

export interface ToolGroup {
  label: string;
  tools: ToolEntry[];
}

export const toolGroups: ToolGroup[] = [
  {
    label: 'Languages · ML · Data Science',
    tools: [
      { title: 'Python', path: siPython.path, hex: siPython.hex },
      {
        title: 'SQL',
        path: 'M12 3c-5 0-9 1.5-9 3.5v11c0 2 4 3.5 9 3.5s9-1.5 9-3.5v-11c0-2-4-3.5-9-3.5zm0 2c4.4 0 7 1.2 7 1.5S16.4 8 12 8 5 6.8 5 6.5 7.6 5 12 5zm-7 4.4c1.7.9 4.2 1.4 7 1.4s5.3-.5 7-1.4v3c0 .3-2.6 1.5-7 1.5S5 12.7 5 12.4v-3zm0 5c1.7.9 4.2 1.4 7 1.4s5.3-.5 7-1.4v3c0 .3-2.6 1.5-7 1.5s-7-1.2-7-1.5v-3z',
        hex: '4479A1',
      },
      { title: 'R', path: siR.path, hex: siR.hex },
      { title: 'pandas', path: siPandas.path, hex: 'B488F0' },
      { title: 'NumPy', path: siNumpy.path, hex: '4D77CF' },
      { title: 'scikit-learn', path: siScikitlearn.path, hex: siScikitlearn.hex },
      { title: 'TensorFlow', path: siTensorflow.path, hex: siTensorflow.hex },
      { title: 'PyTorch', path: siPytorch.path, hex: siPytorch.hex },
      { title: 'Keras', path: siKeras.path, hex: siKeras.hex },
      { title: 'Hugging Face', path: siHuggingface.path, hex: siHuggingface.hex },
      { title: 'MLflow', path: siMlflow.path, hex: siMlflow.hex },
    ],
  },
  {
    label: 'BI · Visualization · Notebooks',
    tools: [
      { ...customIcons.tableau },
      { ...customIcons.powerbi },
      { title: 'Plotly', path: siPlotly.path, hex: siPlotly.hex },
      { title: 'Streamlit', path: siStreamlit.path, hex: siStreamlit.hex },
      { ...customIcons.excel },
      { title: 'Jupyter', path: siJupyter.path, hex: siJupyter.hex },
    ],
  },
  {
    label: 'Data & Cloud',
    tools: [
      { title: 'MySQL', path: siMysql.path, hex: siMysql.hex },
      { title: 'PostgreSQL', path: siPostgresql.path, hex: siPostgresql.hex },
      { ...customIcons.saphana },
      { title: 'Snowflake', path: siSnowflake.path, hex: siSnowflake.hex },
      { title: 'Databricks', path: siDatabricks.path, hex: siDatabricks.hex },
      { title: 'Apache Spark', path: siApachespark.path, hex: 'E25A1C' },
      { title: 'Airflow', path: siApacheairflow.path, hex: siApacheairflow.hex },
      { ...customIcons.aws },
      { ...customIcons.azure },
      { title: 'GCP', path: siGooglecloud.path, hex: siGooglecloud.hex },
    ],
  },
  {
    label: 'Tools & Workflow',
    tools: [
      { title: 'Git', path: siGit.path, hex: siGit.hex },
      { title: 'GitHub', path: siGithub.path, hex: '6E7681' },
      { title: 'Docker', path: siDocker.path, hex: siDocker.hex },
      { ...customIcons.vscode },
      { title: 'Anaconda', path: siAnaconda.path, hex: siAnaconda.hex },
      { title: 'Linux', path: siLinux.path, hex: '4D4D4D' },
      { title: 'Jira', path: siJira.path, hex: '4D8AFF' },
      { title: 'Notion', path: siNotion.path, hex: '6E7681' },
      { title: 'Kaggle', path: siKaggle.path, hex: siKaggle.hex },
      { title: 'Markdown', path: siMarkdown.path, hex: '6E7681' },
    ],
  },
];
