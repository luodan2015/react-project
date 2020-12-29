const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {  // antd 按需加载
  libraryName: 'antd',
  libraryDirectoryj: 'es',
  style: 'css'
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': 'red' }
  })
);