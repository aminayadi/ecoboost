package com.ecoboost.cart.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.ecoboost.cart.domain.Cart} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CartDTO implements Serializable {

    private String id;

    private Integer globalQuantity;

    private String codeProduct;

    private Integer quantity;

    private LocalDate lastestModif;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getGlobalQuantity() {
        return globalQuantity;
    }

    public void setGlobalQuantity(Integer globalQuantity) {
        this.globalQuantity = globalQuantity;
    }

    public String getCodeProduct() {
        return codeProduct;
    }

    public void setCodeProduct(String codeProduct) {
        this.codeProduct = codeProduct;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDate getLastestModif() {
        return lastestModif;
    }

    public void setLastestModif(LocalDate lastestModif) {
        this.lastestModif = lastestModif;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CartDTO)) {
            return false;
        }

        CartDTO cartDTO = (CartDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cartDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CartDTO{" +
            "id='" + getId() + "'" +
            ", globalQuantity=" + getGlobalQuantity() +
            ", codeProduct='" + getCodeProduct() + "'" +
            ", quantity=" + getQuantity() +
            ", lastestModif='" + getLastestModif() + "'" +
            "}";
    }
}
