class ItemModel {
    constructor(data) {
        // Mapeo de los campos del inglés al español
        this.id = data.id;
        this.nombre = data.name;
        this.altura = data.height;
        this.masa = data.mass;
        this.color_pelo = data.hair_color;
        this.color_piel = data.skin_color;
        this.color_ojos = data.eye_color;
        this.nacimiento = data.birth_year;
        this.genero = data.gender;
    }

    // Método estático para traducir un objeto de SWAPI
    static traducirObjeto(data) {
        return new ItemModel(data);
    }

    // Método para obtener los datos en formato de objeto
    toObject() {
        return {
            nombre: this.nombre,
            altura: this.altura,
            masa: this.masa,
            color_pelo: this.color_pelo,
            color_piel: this.color_piel,
            color_ojos: this.color_ojos,
            nacimiento: this.nacimiento,
            genero: this.genero,
        };
    }
}
  
export default ItemModel;
  