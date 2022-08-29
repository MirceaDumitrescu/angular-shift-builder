declare module "debounce-decorator" {
    export function Debounce(wait: number, options?: { leading?: boolean; trailing?: boolean; }): (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
    export default Debounce;
}
