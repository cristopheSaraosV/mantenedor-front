# 🎨 Variables de Material Design

## 📋 Variables Específicas de Angular Material

Este documento explica cómo personalizar los componentes de Angular Material usando las variables CSS específicas.

## 🛠️ Variables del Toolbar

### **Variables Principales**
```scss
:root {
  --toolbar-background: var(--primary-color);    /* Fondo del toolbar */
  --toolbar-text: var(--text-on-primary);        /* Texto del toolbar */
  --toolbar-button-hover: var(--primary-dark);   /* Hover de botones */
}
```

### **Variables Específicas de Material**
```scss
:root {
  --mat-toolbar-container-background-color: var(--toolbar-background);
  --mat-toolbar-container-text-color: var(--toolbar-text);
}
```

### **Cómo Cambiar el Color del Toolbar**
```scss
/* Opción 1: Cambiar la variable principal */
:root {
  --toolbar-background: #673ab7;  /* Púrpura */
}

/* Opción 2: Cambiar directamente la variable de Material */
:root {
  --mat-toolbar-container-background-color: #673ab7;
}

/* Opción 3: Sobrescribir con CSS */
.mat-mdc-toolbar {
  background-color: #673ab7 !important;
}
```

## 🎨 Variables de Botones

### **Variables Principales**
```scss
:root {
  --btn-primary-bg: var(--primary-color);        /* Fondo botón primario */
  --btn-primary-text: var(--text-on-primary);    /* Texto botón primario */
  --btn-primary-hover: var(--primary-dark);      /* Hover botón primario */
}
```

### **Variables Específicas de Material**
```scss
:root {
  --mat-button-primary-background-color: var(--btn-primary-bg);
  --mat-button-primary-text-color: var(--btn-primary-text);
}
```

## 📋 Variables de Cards

### **Variables Principales**
```scss
:root {
  --card-background: var(--surface-color);       /* Fondo card */
  --card-border: var(--border-color);            /* Borde card */
  --card-shadow: var(--shadow-light);            /* Sombra card */
  --card-hover-shadow: var(--shadow-medium);     /* Sombra hover */
}
```

### **Variables Específicas de Material**
```scss
:root {
  --mat-card-container-background-color: var(--card-background);
}
```

## 📝 Variables de Formularios

### **Variables Principales**
```scss
:root {
  --form-field-bg: var(--surface-color);         /* Fondo campo */
  --form-field-border: var(--border-color);      /* Borde campo */
  --form-field-focus: var(--focus-color);        /* Focus campo */
  --form-field-error: var(--error-color);        /* Error campo */
}
```

### **Variables Específicas de Material**
```scss
:root {
  --mat-form-field-container-background-color: var(--form-field-bg);
  --mat-form-field-outline-color: var(--form-field-border);
  --mat-form-field-focus-outline-color: var(--form-field-focus);
}
```

## 🎯 Ejemplos de Personalización

### **Toolbar Verde (como el tuyo)**
```scss
:root {
  --primary-color: #43e901;           /* Verde primario */
  --primary-dark: #2a8400;            /* Verde oscuro */
  --toolbar-background: var(--primary-color);
  --toolbar-text: #ffffff;
  --toolbar-button-hover: var(--primary-dark);
}
```

### **Toolbar Púrpura**
```scss
:root {
  --toolbar-background: #673ab7;
  --toolbar-text: #ffffff;
  --toolbar-button-hover: #512da8;
}
```

### **Toolbar Azul Corporativo**
```scss
:root {
  --toolbar-background: #1976d2;
  --toolbar-text: #ffffff;
  --toolbar-button-hover: #1565c0;
}
```

### **Toolbar Oscuro**
```scss
:root {
  --toolbar-background: #212121;
  --toolbar-text: #ffffff;
  --toolbar-button-hover: #424242;
}
```

## 🔧 Variables Adicionales de Material

### **Variables de Chips**
```scss
:root {
  --mat-chip-container-background-color: var(--chip-primary);
  --mat-chip-container-text-color: var(--text-on-primary);
}
```

### **Variables de Progress Bar**
```scss
:root {
  --mat-progress-bar-background-color: var(--progress-bg);
  --mat-progress-bar-foreground-color: var(--progress-fill);
}
```

### **Variables de Slider**
```scss
:root {
  --mat-slider-track-background-color: var(--slider-track);
  --mat-slider-thumb-background-color: var(--slider-thumb);
  --mat-slider-focus-ring-color: var(--focus-ring);
}
```

### **Variables de Toggle**
```scss
:root {
  --mat-toggle-unselected-track-background-color: var(--toggle-off);
  --mat-toggle-selected-track-background-color: var(--toggle-on);
}
```

## 🎨 Cómo Aplicar Cambios

### **1. Cambio Global**
Modifica las variables en `:root` en el archivo `styles.scss`:
```scss
:root {
  --toolbar-background: #tu-color;
}
```

### **2. Cambio por Tema**
Usa el atributo `data-theme`:
```html
<html data-theme="custom">
```

Y define las variables en el tema:
```scss
[data-theme="custom"] {
  --toolbar-background: #tu-color;
}
```

### **3. Cambio Dinámico con JavaScript**
```javascript
// Cambiar color del toolbar
document.documentElement.style.setProperty('--toolbar-background', '#673ab7');

// Cambiar color primario
document.documentElement.style.setProperty('--primary-color', '#673ab7');
```

## 📱 Responsive Toolbar

### **Toolbar Responsive**
```scss
.mat-mdc-toolbar {
  @media (max-width: 768px) {
    --toolbar-background: var(--primary-dark);
    padding: var(--spacing-sm);
  }
}
```

## 🎯 Notas Importantes

1. **Especificidad**: Usa `!important` solo cuando sea necesario
2. **Consistencia**: Mantén la coherencia con el resto del diseño
3. **Accesibilidad**: Asegúrate de que haya suficiente contraste
4. **Performance**: Las variables CSS son más eficientes que los mixins
5. **Compatibilidad**: Funciona en todos los navegadores modernos

## 🚀 Próximos Pasos

1. Personaliza el color del toolbar según tu marca
2. Ajusta los colores de hover y estados activos
3. Prueba en diferentes dispositivos
4. Verifica la accesibilidad del contraste
5. Documenta los colores de tu marca
