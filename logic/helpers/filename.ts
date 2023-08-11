export function getModelName(filename: string): string {
    return filename
        .split(/(\\|\/)/g)
        .pop()
        ?.replace('.ts', '') as string
}
