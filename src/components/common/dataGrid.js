import React from 'react'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { LinearProgress } from '@mui/material'

function DataGrid(props) {
  return (
    <DataGridPro
      {...props}
      slots={{
        loadingOverlay: LinearProgress,
        ...props.slots
      }}
      localeText={{
        // Root
        noRowsLabel: 'No hay datos.',
        noResultsOverlayLabel: 'No se encontraron resultados.',
        errorOverlayDefaultLabel: 'Ocurrió un error.',

        // Density selector toolbar button text
        toolbarDensity: 'Densidad',
        toolbarDensityLabel: 'Densidad',
        toolbarDensityCompact: 'Compacta',
        toolbarDensityStandard: 'Estándar',
        toolbarDensityComfortable: 'Comfortable',

        // Columns selector toolbar button text
        toolbarColumns: 'Columnas',
        toolbarColumnsLabel: 'Seleccionar columnas',

        // Filters toolbar button text
        toolbarFilters: 'Filtros',
        toolbarFiltersLabel: 'Mostrar filtros',
        toolbarFiltersTooltipHide: 'Esconder filtros',
        toolbarFiltersTooltipShow: 'Mostrar filtros',
        toolbarFiltersTooltipActive: count =>
          count !== 1 ? `${count} active filters` : `${count} Filtro(s) activo(s)`,

        // Export selector toolbar button text
        toolbarExport: 'Exportar',
        toolbarExportLabel: 'Exportar',
        toolbarExportCSV: 'Descargar como CSV',
        toolbarExportPrint: 'Imprimir',

        // Columns panel text
        columnsPanelTextFieldLabel: 'Buscar columna',
        columnsPanelTextFieldPlaceholder: 'Encabezado',
        columnsPanelDragIconLabel: 'Reordenar columna',
        columnsPanelShowAllButton: 'Mostrar todas',
        columnsPanelHideAllButton: 'Esconder todas',

        // Filter panel text
        filterPanelAddFilter: 'Añadir filtro',
        filterPanelDeleteIconLabel: 'Eliminar',
        filterPanelOperators: 'Operadores',
        filterPanelOperatorAnd: 'Y',
        filterPanelOperatorOr: 'O',
        filterPanelColumns: 'Columnas',
        filterPanelInputLabel: 'Valor',
        filterPanelInputPlaceholder: 'Filtrar valor',

        // Filter operators text
        filterOperatorContains: 'contiene',
        filterOperatorEquals: 'igual a',
        filterOperatorStartsWith: 'comienza con',
        filterOperatorEndsWith: 'termina con',
        filterOperatorIs: 'es',
        filterOperatorNot: 'no es',
        filterOperatorAfter: 'es después',
        filterOperatorOnOrAfter: 'is on or after',
        filterOperatorBefore: 'es antes',
        filterOperatorOnOrBefore: 'is on or before',
        filterOperatorIsEmpty: 'es vacío',
        filterOperatorIsNotEmpty: 'no es vacío',

        // Filter values text
        filterValueAny: 'cualquiera',
        filterValueTrue: 'verdadero',
        filterValueFalse: 'falso',

        // Column menu text
        columnMenuLabel: 'Menu',
        columnMenuShowColumns: 'Mostrar columnas',
        columnMenuFilter: 'Filtrar',
        columnMenuHideColumn: 'Esconder',
        columnMenuUnsort: 'Quitar orden',
        columnMenuSortAsc: 'Ordenar ascendentemente',
        columnMenuSortDesc: 'Ordenar descendentemente',

        // Column header text
        columnHeaderFiltersTooltipActive: count =>
          count !== 1 ? `${count} active filters` : `${count} active filter`,
        columnHeaderFiltersLabel: 'Mostrar filtros',
        columnHeaderSortIconLabel: 'Ordenar',

        // Rows selected footer text
        footerRowSelected: count =>
          count !== 1
            ? `${count.toLocaleString()} filas seleccionadas`
            : `${count.toLocaleString()} fila seleccionada`,

        // Total rows footer text
        footerTotalRows: 'Filas totales:',

        // Total visible rows footer text
        footerTotalVisibleRows: (visibleCount, totalCount) =>
          `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

        // Checkbox selection text
        checkboxSelectionHeaderName: 'Checkbox selection',

        // Boolean cell text
        booleanCellTrueLabel: 'verdadero',
        booleanCellFalseLabel: 'falso',

        // Actions cell more text
        actionsCellMore: 'más',

        // Column pinning text
        pinToLeft: 'Anclar a la izquierda',
        pinToRight: 'Anclar a la derecha',
        unpin: 'Desanclar',

        // Tree Data
        treeDataGroupingHeaderName: 'Group',
        treeDataExpand: 'ver descendientes',
        treeDataCollapse: 'ocultar descendientes'
      }}
    />
  )
}

export default DataGrid
