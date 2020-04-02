import { readFileSync } from "fs";

const SECRETS_PATH = "/run/secrets";

export function getSecret(secretName: string): string {
    return readFileSync(`${SECRETS_PATH}/${secretName}`).toString();
}