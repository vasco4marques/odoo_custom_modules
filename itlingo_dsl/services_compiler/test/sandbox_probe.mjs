import { networkInterfaces, tmpdir } from 'node:os';
import { join } from 'node:path';
import {
    readFileSync,
    unlinkSync,
    writeFileSync,
} from 'node:fs';

let hostFilesystemBlocked = false;
try {
    readFileSync('/etc/passwd', 'utf8');
} catch {
    hostFilesystemBlocked = true;
}

let workspaceReadOnly = false;
try {
    writeFileSync(join(process.cwd(), 'sandbox-write-test'), 'blocked', 'utf8');
} catch {
    workspaceReadOnly = true;
}

const tempProbe = join(tmpdir(), `sandbox-probe-${process.pid}`);
writeFileSync(tempProbe, 'ok', 'utf8');
const privateTempWritable = readFileSync(tempProbe, 'utf8') === 'ok';
unlinkSync(tempProbe);

const externalAddresses = Object.values(networkInterfaces())
    .flatMap((addresses) => addresses || [])
    .filter((address) => !address.internal);

process.stdout.write(JSON.stringify({
    unprivileged: process.getuid() === 65534 && process.getgid() === 65534,
    environmentCleared: process.env.ITLINGO_SANDBOX_SECRET === undefined,
    hostFilesystemBlocked,
    workspaceReadOnly,
    privateTempWritable,
    networkIsolated: externalAddresses.length === 0,
}));
