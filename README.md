# Stand Speed Connections 2026

Sitio estático (HTML/CSS puro, sin build) con las tarjetas de innovaciones, patentes y marcas del stand Speed Connections 2026 de la Cámara de Comercio del Huila. Cada una de las 24 tarjetas corresponde a un código QR impreso que apunta a `https://<dominio>/t01` … `/t24`.

## Estructura de archivos

```text
.
├── index.html            # Índice: buscador, filtros (Todas/Patentes/Marcas) y rejilla
├── t01.html … t24.html   # 24 tarjetas, una por QR (galería, lightbox, acciones)
├── 404.html              # Página de error con estilo
├── vercel.json           # cleanUrls: true, trailingSlash: false
├── favicon.ico           # Favicon (16/32/48)
├── site.webmanifest      # Manifiesto (íconos 192 y 512)
├── .gitignore
└── assets/
    ├── css/styles.css    # Única hoja de estilos (variables, responsive, impresión)
    ├── js/app.js         # Aparición escalonada al hacer scroll
    ├── js/card.js        # Galería táctil y lightbox
    ├── js/index.js       # Buscador y filtros del índice
    ├── fonts/            # Montserrat (latin, autoalojada)
    └── img/
        ├── marca/        # logos, banner, íconos del favicon, apple-touch-icon
        ├── tarjetas/     # Fotos tNN_k.jpg (máx. 1200 px de ancho)
        └── thumbs/       # Miniaturas (máx. 480 px) para el índice y la navegación
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
| 23 | PATENTE – PLANTA DE TRATAMIENTO DE AGUA PTAP | NC2024/0002503 | `/t23` |
| 24 | PATENTE – PINZA DESMONTABLE | NC2023/0018611 | `/t24` |

## Despliegue en Vercel

1. En Vercel, **Import** del repositorio.
2. Framework Preset: **Other**.
3. Build Command: vacío (sin build).
4. Output Directory: `./`
5. **Deploy**.

`vercel.json` define `"cleanUrls": true`, por lo que `/t01` sirve `t01.html` (y `/t01.html` redirige a `/t01`); `"trailingSlash": false` evita la barra final.

## ⚠️ Advertencia: no renombrar ni mover las páginas

Los QR ya impresos dependen de las rutas `/t01` … `/t24` (o `/t01.html` … `/t24.html`; ambas funcionan). No renombres, muevas ni borres `t01.html` … `t24.html` ni `index.html`, o los QR dejarán de funcionar. Los assets sí pueden reorganizarse siempre que se actualicen las referencias.

## Observaciones pendientes de confirmar con el área

Se dejan tal cual en el sitio; solo se anotan aquí.

- **LARINGOCEL repetido** en t02 y t05 (t05 describe un dispositivo de capacitancia).
- **COMPOSTERAS repetido** en t12 y t15 (t15 describe fijación ósea).
- **Radicado NC2019/0013907 repetido** en t17 y t18.
- **Radicado SD2025/0089837 repetido** en t19 y t20.
- **t19 (NIAFLEZ)** tiene la descripción de MEDIDOR INTELIGENTE.
- **t03 (SOPORTE CON ESTRIBO)** no tiene inventor, sector ni contacto propios.
- **t18 (DE DÁTIL ENERGY):** el Word definitivo trae una segunda frase en la descripción («IMAGINA PERSONAS ACTIVAS Y FELICES DISFRUTANDO AL MÁXIMO DE LA VIDA, COMO TÚ LO HARÁS CON DATIL ENERGY.») que el sitio no muestra. Pendiente de confirmar; no se aplicó.
- **t03 y t04** comparten el par de fotos que el Word coloca antes de t03.

## Diseño y mantenimiento

- Todo el estilo vive en `assets/css/styles.css` (variables CSS para color, espaciado, radios, sombras y tipografía). No hay estilos dentro de los HTML.
- Móvil primero: 1 columna en móvil, 2 en tablet (≥ 640 px) y, en escritorio (≥ 960 px), galería sticky a la izquierda e información a la derecha. Fotos con `object-fit: contain` sobre fondo desenfocado, botones de mínimo 48 px, barra de acciones fija en móvil y safe-area para iPhone.
- Pantalla de carga breve (≈ 0,8 s, una vez por sesión, omitida con `prefers-reduced-motion`); nunca bloquea el contenido.
- Cada tarjeta incluye metadatos para compartir (Open Graph con URL absoluta de `https://speed-alpha-two.vercel.app`), favicon, `theme-color`, enlace «Saltar al contenido» y estilos de impresión.

## Cómo cambiar el dominio de og:url

Las vistas previas usan URLs absolutas con `https://speed-alpha-two.vercel.app`. Si el dominio cambia, reemplaza ese texto en todos los HTML de la raíz (`index.html`, `t01.html` … `t24.html`), por ejemplo en PowerShell:

```powershell
Get-ChildItem *.html | ForEach-Object {
  (Get-Content $_ -Raw -Encoding UTF8).Replace("https://speed-alpha-two.vercel.app", "https://NUEVO-DOMINIO") |
    Set-Content $_ -NoNewline -Encoding UTF8
}
```

Los QR no cambian: apuntan a las rutas `/tNN`, no al dominio de los metadatos.
