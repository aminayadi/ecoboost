package com.ecoboost.product.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.ecoboost.product.domain.Product} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProductDTO implements Serializable {

    private String id;

    private String name;

    private byte[] image;

    private String imageContentType;
    private String imgname;

    private String description;

    private Integer rating;

    private Integer volume;

    private String code;

    private Integer reduction;

    private Integer pricetogo;

    private Integer pricenej;

    private Integer pricecot;

    private Integer priceseneg;

    private Integer priceghan;

    private String devisetogo;

    private String devisenej;

    private String devisecot;

    private String deviseseneg;

    private String deviseghan;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getImgname() {
        return imgname;
    }

    public void setImgname(String imgname) {
        this.imgname = imgname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getReduction() {
        return reduction;
    }

    public void setReduction(Integer reduction) {
        this.reduction = reduction;
    }

    public Integer getPricetogo() {
        return pricetogo;
    }

    public void setPricetogo(Integer pricetogo) {
        this.pricetogo = pricetogo;
    }

    public Integer getPricenej() {
        return pricenej;
    }

    public void setPricenej(Integer pricenej) {
        this.pricenej = pricenej;
    }

    public Integer getPricecot() {
        return pricecot;
    }

    public void setPricecot(Integer pricecot) {
        this.pricecot = pricecot;
    }

    public Integer getPriceseneg() {
        return priceseneg;
    }

    public void setPriceseneg(Integer priceseneg) {
        this.priceseneg = priceseneg;
    }

    public Integer getPriceghan() {
        return priceghan;
    }

    public void setPriceghan(Integer priceghan) {
        this.priceghan = priceghan;
    }

    public String getDevisetogo() {
        return devisetogo;
    }

    public void setDevisetogo(String devisetogo) {
        this.devisetogo = devisetogo;
    }

    public String getDevisenej() {
        return devisenej;
    }

    public void setDevisenej(String devisenej) {
        this.devisenej = devisenej;
    }

    public String getDevisecot() {
        return devisecot;
    }

    public void setDevisecot(String devisecot) {
        this.devisecot = devisecot;
    }

    public String getDeviseseneg() {
        return deviseseneg;
    }

    public void setDeviseseneg(String deviseseneg) {
        this.deviseseneg = deviseseneg;
    }

    public String getDeviseghan() {
        return deviseghan;
    }

    public void setDeviseghan(String deviseghan) {
        this.deviseghan = deviseghan;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductDTO)) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, productDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductDTO{" +
            "id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", image='" + getImage() + "'" +
            ", imgname='" + getImgname() + "'" +
            ", description='" + getDescription() + "'" +
            ", rating=" + getRating() +
            ", volume=" + getVolume() +
            ", code='" + getCode() + "'" +
            ", reduction=" + getReduction() +
            ", pricetogo=" + getPricetogo() +
            ", pricenej=" + getPricenej() +
            ", pricecot=" + getPricecot() +
            ", priceseneg=" + getPriceseneg() +
            ", priceghan=" + getPriceghan() +
            ", devisetogo='" + getDevisetogo() + "'" +
            ", devisenej='" + getDevisenej() + "'" +
            ", devisecot='" + getDevisecot() + "'" +
            ", deviseseneg='" + getDeviseseneg() + "'" +
            ", deviseghan='" + getDeviseghan() + "'" +
            "}";
    }
}
