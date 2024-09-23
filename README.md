# 1ra entrega

Se creo un gestor de productos (40 pre-cargados) y usuarios (4 pre-cargados) armacenados en archivos de formato JSON.

### Productos:

-   id → código autogenerado automáticamente de 12 bytes y headecimal
-   title → título del producto. Campo obligatorio
-   photo → ruta a la imagen del producto. En caso de no aportarse, se genera automáticamente
-   category → categoría del producto. En caso de no aportarse, se genera automáticamente
-   price → precio del producto. En caso de no aportarse, se genera automáticamente
-   stock → stock del producto. En caso de no aportarse, se genera automáticamente

### Usuarios:

-   id → código autogenerado automáticamente de 12 bytes y headecimal
-   photo → ruta a la imagen del usuario. En caso de no aportarse, se genera automáticamente
-   email → email del usuario. Campo obligatorio
-   password → contraseña del usuario. Campo obligatorio
-   rol → rol del usuario. En caso de no aportarse, se genera automáticamente

### El servidor cuenta con la opción de:

-   create → crear un nuevo recurso
    ![Create product](image-2.png)
    ![Error creating product → Title requiered](image-3.png)

-   readAll → leer todos los recursos
    ![ReadAll products](image.png)
    ![ReadAll users](image-1.png)

-   readOne → leer un recurso particular mediante su Id
    ![ReadOne product](image-4.png)
    ![ReadOne user](image-5.png)

-   update → actualizar un recurso
    ![Update user](image-6.png)
    ![Error updating user](image-7.png)

-   delete → eliminar un recurso
    ![Delete product](image-8.png)
    ![Error deleting product](image-9.png)

Los errores son manejados mediante un errorHandler.<br />
Las rutas no existentes son manejadas mediante un pathHandler.
