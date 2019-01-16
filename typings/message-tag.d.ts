
declare module 'message-tag' {
    const $msg : (strings : TemplateStringsArray, ...interpolations : unknown[]) => string;
    
    export default $msg;
}
