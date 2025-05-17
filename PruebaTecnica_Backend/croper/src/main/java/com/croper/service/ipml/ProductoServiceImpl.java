package com.croper.service.ipml;


import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.croper.dto.ProductoDTO;
import com.croper.model.Producto;
import com.croper.repository.ProductoRepository;
import com.croper.service.ProductoService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public List<ProductoDTO> findAll() {
        return productoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductoDTO findById(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con ID: " + id));
        return convertToDTO(producto);
    }

    @Override
    public ProductoDTO save(ProductoDTO productoDTO) {
        Producto producto = convertToEntity(productoDTO);
        return convertToDTO(productoRepository.save(producto));
    }

    @Override
    public ProductoDTO update(Long id, ProductoDTO productoDTO) {
        Producto producto = convertToEntity(productoDTO);
        producto.setId(id);
        
        return convertToDTO(productoRepository.save(producto));
    }

    @Override
    public void delete(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new EntityNotFoundException("Producto no encontrado con ID: " + id);
        }
        productoRepository.deleteById(id);
    }

    @Override
    public List<ProductoDTO> findByCategoria(String categoria) {
        return productoRepository.findByCategoria(categoria).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProductoDTO convertToDTO(Producto producto) {
        ProductoDTO productoDTO = new ProductoDTO();
        BeanUtils.copyProperties(producto, productoDTO);
        return productoDTO;
    }

    private Producto convertToEntity(ProductoDTO productoDTO) {
        Producto producto = new Producto();
        BeanUtils.copyProperties(productoDTO, producto);
        return producto;
    }
}

