export async function fetchData(oidJuego,oidUsuario){
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
          "oidJuego":oidJuego,
          "oidUsuario":oidUsuario
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      const formatUrlImg = result.RespuestaJuego.imagen;
      return {
        "pregunta":result.RespuestaJuego.pregunta,
        "url": formatUrlImg.replaceAll(' ','%20'), 
        "errores": 10,
        // "errores": result.RespuestaJuego.errores,
        "intentos": result.RespuestaJuego.intentos,
        "puntos": result.RespuestaJuego.puntos
      };
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }    
  }