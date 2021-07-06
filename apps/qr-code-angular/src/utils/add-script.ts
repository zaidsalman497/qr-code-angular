export function addScript(name: string): void {
    const script = document.createElement('script');
    script.id = `script_${name}`;
    script.type = 'text/javascript';
    script.src = `./assets/js/${name}.js`;
    document.body.appendChild(script);
}


export function removeScript(name: string): void {
    const element = document.getElementById(`script_${name}`);
    element?.parentNode?.removeChild(element);
}
