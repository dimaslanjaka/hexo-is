import { deepmerge } from 'deepmerge-ts';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

/**
 * Modifies the Hexo configuration by merging the base config, optional config file, and the provided config object.
 * Writes the merged result back to the config YAML file.
 *
 * @param {Record<string, any>} config - The Hexo configuration object to merge and write.
 * @returns {void}
 */
export function modifyConfig(config) {
  const configBasePath = path.join(__dirname, 'demo', '_config_base.yml');
  const baseContents = fs.readFileSync(configBasePath, 'utf8');
  const parsedBaseConfig = yaml.parse(baseContents);
  const configPath = path.join(__dirname, 'demo', '_config.yml');
  let parsedConfig = {};
  if (fs.existsSync(configPath)) {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    parsedConfig = yaml.parse(fileContents);
  }
  const combined = deepmerge(parsedBaseConfig, parsedConfig, config);
  fs.writeFileSync(configPath, yaml.stringify(combined), 'utf8');
}

/**
 * TestLog class for writing and reading log files, with support for custom file names.
 */
export class TestLog {
  /**
   * @param {string} [fileName] - Custom log file name. Defaults to 'test-log'.
   */
  constructor(fileName) {
    this.fileName = (fileName || 'test-log').replace(/\.[^/.]+$/, '') + '.log';
    this.logPath = path.join(process.cwd(), 'tmp', 'output-shell', this.fileName);
    fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
  }

  /**
   * Write a message to the log file.
   * @param {string} message - The message to write.
   * @param {boolean} [reset=false] - Whether to reset the log file before writing.
   */
  write(message, reset = false) {
    if (reset) {
      fs.writeFileSync(this.logPath, message + '\n', 'utf8');
    } else {
      fs.appendFileSync(this.logPath, message + '\n', 'utf8');
    }
  }

  /**
   * Read the contents of the log file.
   * @returns {string} The contents of the log file, or an empty string if not found.
   */
  read() {
    if (fs.existsSync(this.logPath)) {
      return fs.readFileSync(this.logPath, 'utf8');
    }
    return '';
  }
}
