export class Band {

    private id: string
    private name: string
    private music_genre: string
    private responsible: string

    constructor (
    
        id: string,
        name: string,
        music_genre: string,
        responsible: string

    ) {

        this.id = id,
        this.name = name,
        this.music_genre = music_genre,
        this.responsible = responsible

    }

    public getId = () => {
        return this.id
    }

    public getName = () => {
        return this.name
    }

    public getMusic_genre = () => {
        return this.music_genre
    }

    public getResponsible = () => {
        return this.responsible
    }

    static toBandModel(data: any): Band {
        return new Band (data.id, data.name, data.music_genre, data.responsible)
    }

}