export const isInGame = (): boolean => !! window.location.pathname.match(/^\/\w{2}\/games\/(\d+)/);
