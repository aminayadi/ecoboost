package com.ecoboost.cart.domain;

import java.io.Serializable;
import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Cart.
 */
@Document(collection = "cart")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Cart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("global_quantity")
    private Integer globalQuantity;

    @Field("code_product")
    private String codeProduct;

    @Field("quantity")
    private Integer quantity;

    @Field("lastest_modif")
    private LocalDate lastestModif;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Cart id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getGlobalQuantity() {
        return this.globalQuantity;
    }

    public Cart globalQuantity(Integer globalQuantity) {
        this.setGlobalQuantity(globalQuantity);
        return this;
    }

    public void setGlobalQuantity(Integer globalQuantity) {
        this.globalQuantity = globalQuantity;
    }

    public String getCodeProduct() {
        return this.codeProduct;
    }

    public Cart codeProduct(String codeProduct) {
        this.setCodeProduct(codeProduct);
        return this;
    }

    public void setCodeProduct(String codeProduct) {
        this.codeProduct = codeProduct;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public Cart quantity(Integer quantity) {
        this.setQuantity(quantity);
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDate getLastestModif() {
        return this.lastestModif;
    }

    public Cart lastestModif(LocalDate lastestModif) {
        this.setLastestModif(lastestModif);
        return this;
    }

    public void setLastestModif(LocalDate lastestModif) {
        this.lastestModif = lastestModif;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cart)) {
            return false;
        }
        return id != null && id.equals(((Cart) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cart{" +
            "id=" + getId() +
            ", globalQuantity=" + getGlobalQuantity() +
            ", codeProduct='" + getCodeProduct() + "'" +
            ", quantity=" + getQuantity() +
            ", lastestModif='" + getLastestModif() + "'" +
            "}";
    }
}
