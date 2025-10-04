# 🎨 Sistema de Variables de Colores

## 📋 Descripción

Se ha implementado un sistema completo de variables CSS para personalizar fácilmente el esquema de colores de toda la aplicación Angular Material.

## 🎯 Cómo Usar las Variables

### 1. **Cambiar Colores Primarios**
```scss
:root {
  --primary-color: #673ab7;        /* Cambiar color primario */
  --accent-color: #ff6f00;         /* Cambiar color accent */
}
```

### 2. **Usar Variables en Componentes**
```scss
.mi-componente {
  background-color: var(--primary-color);
  color: var(--text-on-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px var(--shadow-light);
}
```

### 3. **Aplicar Clases de Utilidad**
```html
<div class="bg-primary text-white p-md rounded-lg shadow-md">
  Contenido con estilos aplicados
</div>
```

## 🎨 Categorías de Variables

### **Colores Primarios**
- `--primary-color`: Color principal de la aplicación
- `--primary-light`: Variante clara del primario
- `--primary-dark`: Variante oscura del primario
- `--primary-contrast`: Color de texto sobre primario

### **Colores Secundarios**
- `--accent-color`: Color de acento
- `--accent-light`: Variante clara del accent
- `--accent-dark`: Variante oscura del accent

### **Colores de Estado**
- `--success-color`: Verde para éxito
- `--warning-color`: Naranja para advertencias
- `--error-color`: Rojo para errores
- `--info-color`: Azul para información

### **Colores de Fondo**
- `--background-primary`: Fondo principal de la app
- `--background-secondary`: Fondo secundario
- `--background-tertiary`: Fondo terciario
- `--background-dark`: Fondo oscuro

### **Colores de Texto**
- `--text-primary`: Texto principal
- `--text-secondary`: Texto secundario
- `--text-disabled`: Texto deshabilitado
- `--text-hint`: Texto de pista

### **Colores de Superficie**
- `--surface-color`: Color de superficie
- `--surface-variant`: Variante de superficie
- `--surface-elevated`: Superficie elevada

## 🌙 Temas Predefinidos

### **Tema Oscuro**
```html
<html data-theme="dark">
```
Aplica automáticamente colores oscuros a toda la aplicación.

### **Tema Personalizado**
```html
<html data-theme="custom">
```
Aplica colores personalizados definidos en el CSS.

## 🎨 Colores por Categoría de Producto

```scss
/* Electrónicos */
--category-electronics: #2196f3;

/* Ropa */
--category-clothing: #e91e63;

/* Libros */
--category-books: #4caf50;

/* Hogar */
--category-home: #ff9800;

/* Deportes */
--category-sports: #9c27b0;

/* Comida */
--category-food: #f44336;
```

## 📱 Variables Responsive

### **Breakpoints**
- `--mobile-breakpoint: 768px`
- `--tablet-breakpoint: 1024px`
- `--desktop-breakpoint: 1200px`

### **Espaciado**
- `--spacing-xs: 0.25rem` (4px)
- `--spacing-sm: 0.5rem` (8px)
- `--spacing-md: 1rem` (16px)
- `--spacing-lg: 1.5rem` (24px)
- `--spacing-xl: 2rem` (32px)

### **Border Radius**
- `--border-radius-sm: 4px`
- `--border-radius-md: 8px`
- `--border-radius-lg: 12px`
- `--border-radius-xl: 16px`

## 🛠️ Clases de Utilidad

### **Colores de Texto**
```html
<span class="text-primary">Texto primario</span>
<span class="text-secondary">Texto secundario</span>
<span class="text-success">Texto éxito</span>
<span class="text-warning">Texto advertencia</span>
<span class="text-error">Texto error</span>
<span class="text-info">Texto información</span>
```

### **Colores de Fondo**
```html
<div class="bg-primary">Fondo primario</div>
<div class="bg-secondary">Fondo secundario</div>
<div class="bg-success">Fondo éxito</div>
<div class="bg-warning">Fondo advertencia</div>
<div class="bg-error">Fondo error</div>
<div class="bg-info">Fondo información</div>
```

### **Espaciado**
```html
<div class="p-md m-lg">Padding medio, margen grande</div>
<div class="p-xs m-sm">Padding extra pequeño, margen pequeño</div>
```

### **Border Radius**
```html
<div class="rounded-sm">Bordes redondeados pequeños</div>
<div class="rounded-lg">Bordes redondeados grandes</div>
```

### **Sombras**
```html
<div class="shadow-sm">Sombra ligera</div>
<div class="shadow-md">Sombra media</div>
<div class="shadow-lg">Sombra grande</div>
```

### **Transiciones**
```html
<div class="transition-fast">Transición rápida</div>
<div class="transition-normal">Transición normal</div>
<div class="transition-slow">Transición lenta</div>
```

## 🎨 Ejemplos de Personalización

### **Cambiar a Tema Púrpura**
```scss
:root {
  --primary-color: #673ab7;
  --primary-light: #9575cd;
  --primary-dark: #512da8;
  --accent-color: #ff6f00;
}
```

### **Cambiar a Tema Verde**
```scss
:root {
  --primary-color: #4caf50;
  --primary-light: #81c784;
  --primary-dark: #388e3c;
  --accent-color: #ff9800;
}
```

### **Cambiar a Tema Rosa**
```scss
:root {
  --primary-color: #e91e63;
  --primary-light: #f06292;
  --primary-dark: #c2185b;
  --accent-color: #00bcd4;
}
```

## 🔧 Integración con Angular Material

Las variables están diseñadas para trabajar perfectamente con Angular Material:

```scss
.mat-mdc-card {
  background-color: var(--card-background);
  border: 1px solid var(--card-border);
  box-shadow: 0 2px 4px var(--card-shadow);
}

.mat-mdc-button {
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
}
```

## 📝 Notas Importantes

1. **Compatibilidad**: Todas las variables son compatibles con navegadores modernos
2. **Fallbacks**: Se recomienda definir valores de fallback para navegadores antiguos
3. **Performance**: Las variables CSS son más eficientes que los mixins SCSS
4. **Mantenimiento**: Cambiar una variable actualiza automáticamente toda la aplicación

## 🚀 Próximos Pasos

1. Personaliza los colores según tu marca
2. Aplica el tema oscuro si es necesario
3. Usa las clases de utilidad para estilos rápidos
4. Crea temas personalizados para diferentes secciones
