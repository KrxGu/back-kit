#!/usr/bin/env node

import { select, text, confirm, outro } from '@clack/prompts';
import consola from 'consola';
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import gradient from 'gradient-string';
import pc from 'picocolors';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_ROOT = path.join(__dirname, '..', 'templates');
const copyTemplate = async (templatePath: string, destPath: string): Promise<void> => {
    await fs.copy(templatePath, destPath);
};

const runCLI = async (): Promise<void> => {

    const projectType = await select({
        message: 'Choose project type:',
        options: [
            { value: 'frontend/react', label: 'Frontend (React)' },
            { value: 'backend/express', label: 'Backend (Express)' },
        ],
    });

    if (typeof projectType !== 'string') {
        consola.warn('No project type selected. Exiting.');
        process.exit(0);
    }

    const projectName = await text({ message: 'Enter project name:' });

    if (typeof projectName !== 'string' || !projectName.trim()) {
        consola.warn('No valid project name provided. Exiting.');
        process.exit(0);
    }

    const destDir = path.join(__dirname, projectName.trim());
    if (fs.existsSync(destDir)) {
        const overwrite = await confirm({ message: 'Directory exists. Overwrite?' });
        if (!overwrite) {
            consola.warn('Cancelled.');
            process.exit(0);
        } else {
            await fs.remove(destDir);
        }
    }

    try {
        const templateDir = path.join(TEMPLATE_ROOT, projectType);
        await copyTemplate(templateDir, destDir);
        consola.success(`✅ Project "${projectName}" created at ${pc.cyan(destDir)}`);
    } catch (err) {
        consola.error('❌ Failed to copy template:', err);
        process.exit(1);
    }

    const initGit = await confirm({ message: 'Initialize a git repository?' });
    if (initGit) {
        try {
            await execa('git', ['init'], { cwd: destDir });
            consola.success('📁 Git repository initialized.');
        } catch (error) {
            consola.warn('Git initialization failed.');
        }
    }

    outro('Done! Happy coding 👨‍💻');
};

yargs(hideBin(process.argv))
    .scriptName('gen')
    .usage('Generate a new project from templates')
    .command(
        '$0',
        'Generate a new project from templates',
        () => { },
        async () => {
            await runCLI();
        }
    )
    .help()
    .argv;
