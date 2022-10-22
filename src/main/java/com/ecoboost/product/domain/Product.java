package com.ecoboost.product.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Product.
 */
@Document(collection = "product")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("image")
    private byte[] image;

    @Field("image_content_type")
    private String imageContentType;

    @Field("imgname")
    private String imgname;

    @Field("description")
    private String description;

    @Field("rating")
    private Integer rating;

    @Field("volume")
    private Integer volume;

    @Field("code")
    private String code;

    @Field("reduction")
    private Integer reduction;

    @Field("pricetogo")
    private Integer pricetogo;

    @Field("pricenej")
    private Integer pricenej;

    @Field("pricecot")
    private Integer pricecot;

    @Field("priceseneg")
    private Integer priceseneg;

    @Field("priceghan")
    private Integer priceghan;

    @Field("devisetogo")
    private String devisetogo;

    @Field("devisenej")
    private String devisenej;

    @Field("devisecot")
    private String devisecot;

    @Field("deviseseneg")
    private String deviseseneg;

    @Field("deviseghan")
    private String deviseghan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Product id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return this.image;
    }

    public Product image(byte[] image) {
        this.setImage(image);
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return this.imageContentType;
    }

    public Product imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getImgname() {
        return this.imgname;
    }

    public Product imgname(String imgname) {
        this.setImgname(imgname);
        return this;
    }

    public void setImgname(String imgname) {
        this.imgname = imgname;
    }

    public String getDescription() {
        return this.description;
    }

    public Product description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRating() {
        return this.rating;
    }

    public Product rating(Integer rating) {
        this.setRating(rating);
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getVolume() {
        return this.volume;
    }

    public Product volume(Integer volume) {
        this.setVolume(volume);
        return this;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }

    public String getCode() {
        return this.code;
    }

    public Product code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getReduction() {
        return this.reduction;
    }

    public Product reduction(Integer reduction) {
        this.setReduction(reduction);
        return this;
    }

    public void setReduction(Integer reduction) {
        this.reduction = reduction;
    }

    public Integer getPricetogo() {
        return this.pricetogo;
    }

    public Product pricetogo(Integer pricetogo) {
        this.setPricetogo(pricetogo);
        return this;
    }

    public void setPricetogo(Integer pricetogo) {
        this.pricetogo = pricetogo;
    }

    public Integer getPricenej() {
        return this.pricenej;
    }

    public Product pricenej(Integer pricenej) {
        this.setPricenej(pricenej);
        return this;
    }

    public void setPricenej(Integer pricenej) {
        this.pricenej = pricenej;
    }

    public Integer getPricecot() {
        return this.pricecot;
    }

    public Product pricecot(Integer pricecot) {
        this.setPricecot(pricecot);
        return this;
    }

    public void setPricecot(Integer pricecot) {
        this.pricecot = pricecot;
    }

    public Integer getPriceseneg() {
        return this.priceseneg;
    }

    public Product priceseneg(Integer priceseneg) {
        this.setPriceseneg(priceseneg);
        return this;
    }

    public void setPriceseneg(Integer priceseneg) {
        this.priceseneg = priceseneg;
    }

    public Integer getPriceghan() {
        return this.priceghan;
    }

    public Product priceghan(Integer priceghan) {
        this.setPriceghan(priceghan);
        return this;
    }

    public void setPriceghan(Integer priceghan) {
        this.priceghan = priceghan;
    }

    public String getDevisetogo() {
        return this.devisetogo;
    }

    public Product devisetogo(String devisetogo) {
        this.setDevisetogo(devisetogo);
        return this;
    }

    public void setDevisetogo(String devisetogo) {
        this.devisetogo = devisetogo;
    }

    public String getDevisenej() {
        return this.devisenej;
    }

    public Product devisenej(String devisenej) {
        this.setDevisenej(devisenej);
        return this;
    }

    public void setDevisenej(String devisenej) {
        this.devisenej = devisenej;
    }

    public String getDevisecot() {
        return this.devisecot;
    }

    public Product devisecot(String devisecot) {
        this.setDevisecot(devisecot);
        return this;
    }

    public void setDevisecot(String devisecot) {
        this.devisecot = devisecot;
    }

    public String getDeviseseneg() {
        return this.deviseseneg;
    }

    public Product deviseseneg(String deviseseneg) {
        this.setDeviseseneg(deviseseneg);
        return this;
    }

    public void setDeviseseneg(String deviseseneg) {
        this.deviseseneg = deviseseneg;
    }

    public String getDeviseghan() {
        return this.deviseghan;
    }

    public Product deviseghan(String deviseghan) {
        this.setDeviseghan(deviseghan);
        return this;
    }

    public void setDeviseghan(String deviseghan) {
        this.deviseghan = deviseghan;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
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
