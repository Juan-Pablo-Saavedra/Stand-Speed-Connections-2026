# Stand Speed Connections 2026

Sitio estático (HTML/CSS puro, sin build) con las tarjetas de innovaciones, patentes y marcas del stand Speed Connections 2026 de la Cámara de Comercio del Huila. Cada tarjeta corresponde a un código QR impreso que apunta a `https://<dominio>/t01` … `/t22`.

## Estructura de archivos

```text
.
├── index.html          # Listado con buscador y filtro (patentes/marcas)
├── t01.html …          # 22 tarjetas (t01.html a t22.html), una por QR
├── 404.html            # Página de error con estilo
├── vercel.json         # cleanUrls: true, trailingSlash: false
├── .gitignore
└── assets/
    ├── css/styles.css  # Única hoja de estilos (variables, responsive, impresión)
    ├── js/index.js     # Buscador/filtro del índice (mejora progresiva)
    └── img/
        ├── marca/      # banner, logos y favicon.svg
        ├── tarjetas/   # Fotos originales tNN_k.jpg
        └── thumbs/     # Miniaturas (144 px) usadas por el índice
```

## Enlaces por tarjeta

| N.º | Tarjeta | Radicado | Ruta |
| --- | --- | --- | --- |
| 01 | PATENTE - AIRWAYFLEX | NC2026/0003395 | `/t01` |
| 02 | PATENTE - LARINGOCEL | NC2022/0010319 | `/t02` |
| 03 | PATENTE – SOPORTE CON ESTRIBO | NC2020/0012382 | `/t03` |
| 04 | PATENTE – TIPO MANTA | NC2023/0013042 | `/t04` |
| 05 | PATENTE - LARINGOCEL | NC2023/0018502 | `/t05` |
| 06 | PATENTE – FORMULA ENFOSCADOS DE PARED | NC2024/0001678 | `/t06` |
| 07 | PATENTE – MÁQUINA MODULAR PARA CLASIFICACIÓN DE GRANOS DE CAFÉ | NC2024/0009441 | `/t07` |
| 08 | PATENTE – SISTEMA DE CONTROL DE OLORES | NC2024/0013637 | `/t08` |
| 09 | PATENTE – ESTUFA ECO-EFICIENTE | NC2017/0008373 | `/t09` |
| 10 | PATENTE – SISTEMA DE CONTROL DE OLORES | NC2023/0008649 | `/t10` |
| 11 | PATENTE – MÁQUINA DESFIBRADO FINO DE PENCAS | NC2024/0003879 | `/t11` |
| 12 | PATENTE – COMPOSTERAS | NC2021/0017533 | `/t12` |
| 13 | PATENTE – ALFAJÍAS EN POLIESTIRENO EXPANDIDO | NC2025/0009562 | `/t13` |
| 14 | PATENTE – PERSONAJES CÓMICS | NC2026/0008668 – NC2026/0008670 | `/t14` |
| 15 | PATENTE – COMPOSTERAS | NC2019/0014675 | `/t15` |
| 16 | MARCA – ROBOKIDS | SD2025/0089253 | `/t16` |
| 17 | PATENTE – MEDIDOR INTELIGENTE | NC2019/0013907 | `/t17` |
| 18 | MARCA – DE DÁTIL ENERGY | NC2019/0013907 | `/t18` |
| 19 | MARCA – NIAFLEZ BY ESTEFANIA AMAR | SD2025/0089837 | `/t19` |
| 20 | MARCA – PALMARITO COFFEE | SD2025/0089837 | `/t20` |
| 21 | MARCA – CHAPURO COFFEE | SD2022/0067358 | `/t21` |
| 22 | MARCA – ROSSE PASTEL | SD2025/0035541 | `/t22` |

## Despliegue en Vercel

1. En Vercel, **Import** del repositorio.
2. Framework Preset: **Other**.
3. Build Command: vacío (sin build).
4. Output Directory: `./`
5. **Deploy**.

`vercel.json` define `"cleanUrls": true`, por lo que `/t01` sirve `t01.html` (y `/t01.html` redirige a `/t01`); `"trailingSlash": false` evita la barra final.

## ⚠️ Advertencia: no renombrar ni mover las páginas

Los QR ya impresos dependen de las rutas `/t01` … `/t22` (o `/t01.html` … `/t22.html`; ambas funcionan). No renombres, muevas ni borres `t01.html` … `t22.html` ni `index.html`, o los QR dejarán de funcionar. Los assets sí pueden reorganizarse siempre que se actualicen las referencias.

## Observaciones pendientes de confirmar con el área

Se dejan tal cual en el sitio; solo se anotan aquí.

- **LARINGOCEL repetido** en t02 y t05 (t05 describe un dispositivo de capacitancia).
- **COMPOSTERAS repetido** en t12 y t15 (t15 describe fijación ósea).
- **Radicado NC2019/0013907 repetido** en t17 y t18.
- **Radicado SD2025/0089837 repetido** en t19 y t20.
- **t19 (NIAFLEZ)** tiene la descripción de MEDIDOR INTELIGENTE.
- **t03 (SOPORTE CON ESTRIBO)** no tiene inventor, sector ni contacto propios.

## Diseño y mantenimiento

- Todo el estilo vive en `assets/css/styles.css` (variables CSS para color, espaciado, radios, sombras y tipografía). No hay estilos dentro de los HTML.
- Móvil primero: 1 columna en móvil, 2 en tablet (≥ 640 px) y, en escritorio (≥ 960 px), foto a la izquierda e información a la derecha. Fotos con `object-fit: contain`, botones de mínimo 48 px y safe-area para iPhone.
- Cada tarjeta incluye metadatos para compartir (Open Graph con URL absoluta de `https://speed-alpha-two.vercel.app`), favicon, `theme-color`, enlace «Saltar al contenido» y estilos de impresión.
- Si cambia el dominio, actualiza las URLs `og:url` y `og:image` de cada página.
