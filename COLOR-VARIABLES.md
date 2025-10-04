# 🎨 Variables Globales de Colores

## 📋 Sistema de Variables Implementado

Ahora tienes un sistema súper fácil para cambiar los colores de toda la aplicación. Solo necesitas cambiar **UNA variable** y se aplicará en todos lados.

## 🎯 Variables Principales

### **Cambiar Color Principal**
```scss
:root {
  --color-primary: #9e6700;           /* Color principal (dorado) */
  --color-primary-dark: #7a5200;      /* Color principal oscuro */
}
```

### **Cambiar Color Accent**
```scss
:root {
  --color-accent: #ff4081;            /* Color accent (rosa) */
}
```

### **Cambiar Color de Error**
```scss
:root {
  --color-error: #f44336;             /* Color error (rojo) */
}
```

### **Cambiar Color de Éxito**
```scss
:root {
  --color-success: #4caf50;           /* Color éxito (verde) */
}
```

### **Cambiar Color de Advertencia**
```scss
:root {
  --color-warning: #ff9800;           /* Color advertencia (naranja) */
}
```

## 🎨 Ejemplos de Personalización

### **Tema Azul**
```scss
:root {
  --color-primary: #2196f3;           /* Azul */
  --color-primary-dark: #1976d2;      /* Azul oscuro */
  --color-accent: #ff4081;            /* Rosa */
  --color-error: #f44336;             /* Rojo */
}
```

### **Tema Verde**
```scss
:root {
  --color-primary: #4caf50;           /* Verde */
  --color-primary-dark: #388e3c;      /* Verde oscuro */
  --color-accent: #ff9800;            /* Naranja */
  --color-error: #f44336;             /* Rojo */
}
```

### **Tema Púrpura**
```scss
:root {
  --color-primary: #673ab7;           /* Púrpura */
  --color-primary-dark: #512da8;      /* Púrpura oscuro */
  --color-accent: #ff4081;            /* Rosa */
  --color-error: #f44336;             /* Rojo */
}
```

### **Tema Rojo**
```scss
:root {
  --color-primary: #f44336;           /* Rojo */
  --color-primary-dark: #d32f2f;      /* Rojo oscuro */
  --color-accent: #ff9800;            /* Naranja */
  --color-error: #9c27b0;             /* Púrpura */
}
```

## 🔧 Componentes que Usan las Variables

### **Toolbar**
- Fondo: `--color-primary`
- Texto: `--color-text-on-primary`

### **Botones Primarios**
- Fondo: `--color-primary`
- Texto: `--color-text-on-primary`

### **Botones Accent**
- Fondo: `--color-accent`
- Texto: `--color-text-on-primary`

### **Botones Warn**
- Fondo: `--color-error`
- Texto: `--color-text-on-primary`

### **Cards**
- Fondo: `--color-surface`
- Borde: `--color-border`
- Sombra: `--color-shadow`

### **Form Fields**
- Focus: `--color-primary`

### **Chips Primarios**
- Fondo: `--color-primary`
- Texto: `--color-text-on-primary`

### **Chips Warn**
- Fondo: `--color-error`
- Texto: `--color-text-on-primary`

### **Progress Spinner**
- Color: `--color-primary`

### **Iconos Warn**
- Color: `--color-error`

## 🚀 Cómo Cambiar los Colores

### **Paso 1: Abrir el archivo**
Abre `frontEnd/src/styles.scss`

### **Paso 2: Buscar las variables**
Busca la sección `:root` al inicio del archivo

### **Paso 3: Cambiar los colores**
```scss
:root {
  /* CAMBIA ESTOS COLORES PARA PERSONALIZAR TODO */
  --color-primary: #tu-color-aqui;           /* Color principal */
  --color-primary-dark: #tu-color-oscuro;    /* Color principal oscuro */
  --color-accent: #tu-color-accent;          /* Color accent */
  --color-error: #tu-color-error;            /* Color error */
  --color-success: #tu-color-exito;          /* Color éxito */
  --color-warning: #tu-color-advertencia;    /* Color advertencia */
}
```

### **Paso 4: Compilar**
```bash
npm run build
```

### **Paso 5: Recargar**
Recarga la página con **Ctrl+F5**

## 🎯 Variables Completas

```scss
:root {
  /* ========================================
     🎨 VARIABLES GLOBALES DE COLORES
     ======================================== */
  
  /* CAMBIA ESTOS COLORES PARA PERSONALIZAR TODO */
  --color-primary: #9e6700;           /* Color principal (dorado) */
  --color-primary-dark: #7a5200;      /* Color principal oscuro */
  --color-accent: #ff4081;            /* Color accent (rosa) */
  --color-error: #f44336;             /* Color error (rojo) */
  --color-success: #4caf50;           /* Color éxito (verde) */
  --color-warning: #ff9800;           /* Color advertencia (naranja) */
  
  /* Colores de Fondo */
  --color-background: #f5f5f5;        /* Fondo principal */
  --color-surface: #ffffff;           /* Color de superficie */
  
  /* Colores de Texto */
  --color-text: #212121;              /* Texto principal */
  --color-text-on-primary: #ffffff;   /* Texto sobre color primario */
  
  /* Colores de Borde */
  --color-border: #e0e0e0;            /* Color de borde */
  
  /* Colores de Sombra */
  --color-shadow: rgba(0, 0, 0, 0.1); /* Sombra ligera */
}
```

## ✨ Beneficios

1. **🎨 Un solo lugar**: Cambia un color y se aplica en toda la app
2. **⚡ Rápido**: No necesitas buscar en múltiples archivos
3. **🔄 Consistente**: Todos los componentes usan los mismos colores
4. **🛠️ Fácil mantenimiento**: Un solo lugar para personalizar
5. **📱 Responsive**: Funciona en todos los dispositivos

## 🎨 Paletas de Colores Sugeridas

### **Paleta Corporativa**
```scss
--color-primary: #1976d2;    /* Azul corporativo */
--color-accent: #ff4081;     /* Rosa */
--color-error: #f44336;      /* Rojo */
```

### **Paleta Naturaleza**
```scss
--color-primary: #4caf50;    /* Verde */
--color-accent: #ff9800;     /* Naranja */
--color-error: #f44336;      /* Rojo */
```

### **Paleta Elegante**
```scss
--color-primary: #673ab7;    /* Púrpura */
--color-accent: #ff4081;     /* Rosa */
--color-error: #f44336;      /* Rojo */
```

### **Paleta Fuego**
```scss
--color-primary: #f44336;    /* Rojo */
--color-accent: #ff9800;     /* Naranja */
--color-error: #9c27b0;      /* Púrpura */
```

¡Ahora puedes personalizar toda tu aplicación cambiando solo unas pocas variables! 🚀
