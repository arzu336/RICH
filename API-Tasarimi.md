# OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: RICH Alışveriş API
  description: |
    E-ticaret platformu için RESTful API.
    
    ## Özellikler
    - Kullanıcı yönetimi (kayıt, giriş, çıkış, hesap silme)
    - Ürün katalog yönetimi (kategori, beden, renk, stok, fiyat sıralama)
    - Favoriler yönetimi
    - Sepet yönetimi
    - Ödeme işlemleri
    - Adres Yönetimi
    - JWT tabanlı kimlik doğrulama
  version: 1.0.0
  contact:
    name: API Destek Ekibi
    email: api-support@rich.com
    url: [https://api.rich.com/support](https://api.rich.com/support)
  license:
    name: MIT
    url: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

servers:
  - url: [https://rich-api.com/v1](https://rich-api.com/v1)
    description: Production server
  - url: [https://staging-api.rich.com/v1](https://staging-api.rich.com/v1)
    description: Staging server

tags:
  - name: auth
    description: Kimlik doğrulama işlemleri
  - name: users
    description: Kullanıcı ve profil yönetimi
  - name: products
    description: Ürün işlemleri
  - name: favorites
    description: Favoriler işlemleri
  - name: cart
    description: Sepet işlemleri
  - name: orders
    description: Sipariş ve ödeme işlemleri
  - name: addresses
    description: Adres yönetimi

paths:
  /auth/register:
    post:
      tags:
        - auth
      summary: Kullanıcı kaydı
      description: Sisteme yeni bir kullanıcı kaydeder
      operationId: registerUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserRegistration'
            examples:
              example1:
                summary: Örnek kullanıcı kaydı
                value:
                  email: kullanici@example.com
                  password: Guvenli123!
                  firstName: Ahmet
                  lastName: Yılmaz
      responses:
        '201':
          description: Kullanıcı başarıyla oluşturuldu
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          description: Email adresi zaten kullanımda
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/login:
    post:
      tags:
        - auth
      summary: Kullanıcı girişi
      operationId: loginUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginCredentials'
      responses:
        '200':
          description: Giriş başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthToken'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /auth/logout:
    post:
      tags:
        - auth
      summary: Çıkış yap
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Çıkış başarılı

  /users/{userId}:
    delete:
      tags:
        - users
      summary: Hesap silme
      parameters:
        - $ref: '#/components/parameters/UserIdParam'
      security:
        - bearerAuth: []
      responses:
        '204':
          description: Kullanıcı başarıyla silindi

  /products:
    get:
      tags:
        - products
      summary: Ürün listesi
      parameters:
        - $ref: '#/components/parameters/PageParam'
        - $ref: '#/components/parameters/LimitParam'
        - name: category
          in: query
          schema:
            type: string
            enum: [kadin, erkek, bebek, aksesuar]
        - name: sortByPrice
          in: query
          schema:
            type: string
            enum: [asc, desc]
      responses:
        '200':
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductList'

  /favorites:
    get:
      tags:
        - favorites
      summary: Favori ürünleri listele
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Başarılı
    post:
      tags:
        - favorites
      summary: Favorilere ürün ekle
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FavoriteCreate'
      responses:
        '201':
          description: Ürün favorilere eklendi

  /cart:
    get:
      tags:
        - cart
      summary: Sepeti görüntüle
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Başarılı
    post:
      tags:
        - cart
      summary: Sepete ürün ekle
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CartItemCreate'
      responses:
        '201':
          description: Ürün sepete eklendi

  /orders:
    post:
      tags:
        - orders
      summary: Ödeme ve sipariş oluşturma
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderCreate'
      responses:
        '201':
          description: Sipariş oluşturuldu

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  parameters:
    UserIdParam:
      name: userId
      in: path
      required: true
      schema:
        type: string
        format: uuid
    PageParam:
      name: page
      in: query
      schema:
        type: integer
        default: 1
    LimitParam:
      name: limit
      in: query
      schema:
        type: integer
        default: 20
  schemas:
    User:
      type: object
      properties:
        id: {type: string, format: uuid}
        email: {type: string}
        firstName: {type: string}
        lastName: {type: string}
    UserRegistration:
      type: object
      required: [email, password, firstName, lastName]
      properties:
        email: {type: string}
        password: {type: string}
        firstName: {type: string}
        lastName: {type: string}
    LoginCredentials:
      type: object
      required: [email, password]
      properties:
        email: {type: string}
        password: {type: string}
    ProductList:
      type: object
      properties:
        data:
          type: array
          items: {$ref: '#/components/schemas/Product'}
    Product:
      type: object
      properties:
        id: {type: string}
        name: {type: string}
        price: {type: number}
        category: {type: string}
    FavoriteCreate:
      type: object
      required: [productId]
      properties:
        productId: {type: string}
    OrderCreate:
      type: object
      required: [items, shippingAddress]
      properties:
        items:
          type: array
          items: {$ref: '#/components/schemas/CartItem'}
        shippingAddress: {$ref: '#/components/schemas/Address'}
    Address:
      type: object
      required: [street, city, postalCode, country]
      properties:
        street: {type: string}
        city: {type: string}
        postalCode: {type: string}
        country: {type: string}
    Error:
      type: object
      properties:
        code: {type: string}
        message: {type: string}

responses:
  BadRequest:
    description: Geçersiz istek
  Unauthorized:
    description: Yetkisiz erişim
  NotFound:
    description: Kaynak bulunamadı
  Forbidden:
    description: Erişim reddedildi