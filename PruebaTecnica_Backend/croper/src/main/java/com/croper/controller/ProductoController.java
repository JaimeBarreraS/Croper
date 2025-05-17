package com.croper.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.croper.dto.ProductoDTO;
import com.croper.service.ProductoService;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@Tag(name = "Productos", description = "API para gestionar productos")
@SecurityRequirement(name = "JWT")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    @Operation(summary = "Obtener todos los productos", description = "Retorna una lista de todos los productos disponibles")
    @ApiResponse(responseCode = "200", description = "Lista de productos recuperada con éxito")
    public ResponseEntity<List<ProductoDTO>> getAllProductos() {
        return ResponseEntity.ok(productoService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un producto por ID", description = "Retorna un producto específico según su ID")
    @ApiResponse(responseCode = "200", description = "Producto encontrado")
    @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
    public ResponseEntity<ProductoDTO> getProductoById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo producto", description = "Crea un nuevo producto con los datos proporcionados")
    @ApiResponse(responseCode = "201", description = "Producto creado exitosamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content)
    public ResponseEntity<ProductoDTO> createProducto(@Valid @RequestBody ProductoDTO productoDTO) {
        return new ResponseEntity<>(productoService.save(productoDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un producto", description = "Actualiza un producto existente con los datos proporcionados")
    @ApiResponse(responseCode = "200", description = "Producto actualizado exitosamente")
    @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
    @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content)
    public ResponseEntity<ProductoDTO> updateProducto(@PathVariable Long id, @Valid @RequestBody ProductoDTO productoDTO) {
        return ResponseEntity.ok(productoService.update(id, productoDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un producto", description = "Elimina un producto según su ID")
    @ApiResponse(responseCode = "204", description = "Producto eliminado exitosamente")
    @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        productoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categoria/{categoria}")
    @Operation(summary = "Obtener productos por categoría", description = "Retorna una lista de productos filtrados por categoría")
    @ApiResponse(responseCode = "200", description = "Lista de productos por categoría")
    public ResponseEntity<List<ProductoDTO>> getProductosByCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(productoService.findByCategoria(categoria));
    }
}


