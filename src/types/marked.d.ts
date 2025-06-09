declare module "marked" {
	export interface MarkedOptions {
		gfm?: boolean;
		breaks?: boolean;
		sanitize?: boolean;
		[key: string]: any;
	}

	export class Renderer {
		constructor();
		link(token: any): string;
		image(token: any): string;
		table(token: any): string;
		blockquote(token: any): string;
		code(token: any): string;
		listitem(token: any): string;
		[key: string]: any;
	}

	interface MarkedInstance {
		(src: string, options?: MarkedOptions): string | Promise<string>;
		setOptions(options: MarkedOptions): void;
		use(options: { renderer?: Renderer }): void;
		Renderer: typeof Renderer;
	}

	export const marked: MarkedInstance;
}
