import { readFile, writeFile } from 'node:fs/promises';

async function readTextFile(filePath: string): Promise<string> {
    try {
        return await readFile(filePath, 'utf-8');
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error reading file ${filePath}: ${error.message}`);
        } else {
            throw new Error('Unknown error reading file');
        }
    }
}

async function writeTextFile(filePath: string, data: string): Promise<void> {
    try {
        return await writeFile(filePath, data + '\n', { flag: 'a' });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Unable to write on file ${error.message}`);
        } else {
            throw new Error('Unknown error writing to file');
        }
    }
}

(async () => {
    await writeTextFile('../logs.txt', JSON.stringify({ message: 'Hello world!' }));
    console.log(await readTextFile('../logs.txt'));
})();
