import { accessSync, constants, readFileSync } from 'node:fs';
import { networkInterfaces } from 'node:os';

export default function createDslModule() {
    if (process.env.PASSWORD || process.env.DB_PASSWORD) {
        throw new Error('The host environment crossed the parser sandbox boundary');
    }
    let hostFilesystemBlocked = false;
    try {
        readFileSync('/etc/passwd', 'utf8');
    } catch {
        hostFilesystemBlocked = true;
    }
    if (!hostFilesystemBlocked) {
        throw new Error('The host filesystem crossed the parser sandbox boundary');
    }
    const externalAddresses = Object.values(networkInterfaces())
        .flatMap((addresses) => addresses || [])
        .filter((address) => !address.internal);
    if (externalAddresses.length) {
        throw new Error('A host network crossed the parser sandbox boundary');
    }
    try {
        accessSync('/usr/bin/bwrap', constants.X_OK);
        throw new Error('The setuid sandbox launcher is executable inside the sandbox');
    } catch (error) {
        if (String(error).includes('setuid sandbox launcher')) {
            throw error;
        }
    }
    return {};
}
