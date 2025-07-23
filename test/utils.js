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
