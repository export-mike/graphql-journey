if (process.env.NODE_ENV === 'development')
  return require('./dev');

return require('./production');
