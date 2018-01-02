interface System {
    import<T>(request: string): Promise<T>;
}
declare var System: System;
declare var DEV: boolean;