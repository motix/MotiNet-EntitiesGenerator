export class ContentGenerator {
    get language() { return ''; }

    generate() { }
}

export class CSharpContentGenerator {
    get language() { return 'csharp'; }
}

export class ProjectFileGenerator extends ContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    get language() { return 'xml'; }
}
