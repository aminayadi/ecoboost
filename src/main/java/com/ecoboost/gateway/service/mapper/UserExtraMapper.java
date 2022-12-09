package com.ecoboost.gateway.service.mapper;

import com.ecoboost.gateway.domain.User;
import com.ecoboost.gateway.domain.UserExtra;
import com.ecoboost.gateway.service.dto.UserDTO;
import com.ecoboost.gateway.service.dto.UserExtraDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserExtra} and its DTO {@link UserExtraDTO}.
 */
@Mapper(componentModel = "spring")
public interface UserExtraMapper extends EntityMapper<UserExtraDTO, UserExtra> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    UserExtraDTO toDto(UserExtra s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
