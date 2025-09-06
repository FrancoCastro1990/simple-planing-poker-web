import { ConfigProvider, theme } from 'antd';
import { AppRouter } from '@app/router/AppRouter';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          // Colores principales basados en nuestro sistema
          colorPrimary: '#8f3f71',     // magenta - elementos especiales, tarjetas seleccionadas
          colorSuccess: '#427b58',     // verde - estados de éxito, usuarios que votaron
          colorInfo: '#076678',        // azul - acciones primarias, promedios
          colorWarning: '#b57614',     // amarillo - advertencias, hover, usuarios esperando
          colorError: '#9d0006',       // rojo - errores, valores altos, acciones destructivas
          
          // Responsive mobile-first breakpoints
          screenXS: 480,
          screenSM: 576, 
          screenMD: 768,
          screenLG: 992,
          screenXL: 1200,
          screenXXL: 1600,
          
          // Configuración general
          borderRadius: 8,
          borderRadiusLG: 12,
          
          // Fondos
          colorBgContainer: '#fdfdfd',
          colorBgBase: '#fdfdfd',
          colorBgLayout: '#f5f5f5',
          
          // Tipografía
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 14,
          fontSizeLG: 16,
          fontSizeXL: 18,
          
          // Espaciado
          padding: 16,
          paddingLG: 24,
          paddingXL: 32,
          margin: 16,
          marginLG: 24,
          marginXL: 32,
        },
        components: {
          // Configuración específica para componentes
          Button: {
            borderRadius: 8,
            paddingContentHorizontal: 16,
          },
          Card: {
            borderRadius: 12,
            paddingLG: 24,
          },
          Input: {
            borderRadius: 8,
            paddingInline: 12,
          },
          Form: {
            itemMarginBottom: 16,
          },
          Typography: {
            titleMarginBottom: 16,
            titleMarginTop: 0,
          },
          List: {
            itemPadding: '12px 0',
          },
          Grid: {
            // Configuración para Grid responsive
          },
        }
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
