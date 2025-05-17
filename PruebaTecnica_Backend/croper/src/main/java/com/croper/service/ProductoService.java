package com.croper.service;


import java.util.List;

import com.croper.dto.ProductoDTO;

public interface ProductoService {
    List<ProductoDTO> findAll();
    ProductoDTO findById(Long id);
    ProductoDTO save(ProductoDTO productoDTO);
    ProductoDTO update(Long id, ProductoDTO productoDTO);
    void delete(Long id);
    List<ProductoDTO> findByCategoria(String categoria);
}





