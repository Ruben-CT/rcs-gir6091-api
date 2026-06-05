//! DOminio: Capa de datos puros
//! Entidad: MOdelo de datos 

export class Task {
    id: string | undefined;
    constructor(
        public readonlyid: string,
        public title: string,
        public description: string,
        public status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
        public createdAT: Date
    ) {}

    // Lógical en la capa de dominio
    complete() {
        this.status = 'COMPLETED';
    }
}