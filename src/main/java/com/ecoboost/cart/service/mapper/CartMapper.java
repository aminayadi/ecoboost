package com.ecoboost.cart.service.mapper;

import com.ecoboost.cart.domain.Cart;
import com.ecoboost.cart.service.dto.CartDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cart} and its DTO {@link CartDTO}.
 */
@Mapper(componentModel = "spring")
public interface CartMapper extends EntityMapper<CartDTO, Cart> {}
