const config = require("../config");
const ServerError = require("../error");

module.exports = (app) => {
  //standard response handler
  app.use((req, res, next) => {
    try {
      if (!req.route) {
        //Route Not found  issue #2
        let err = new ServerError(550);
        next(err);
      } else {
        //Set Status
        const STATUS = res.locals ? res.locals.status : undefined;
        res.status(STATUS || 200);
        //Response
        const path = req.route.path.split("/");
        const responseType = config.instance.responseVersion;
        switch (responseType) {
          case 1: //OLD Proxim APIs  v1, v2, v21
            res.json({
              success: true,
              message: "All good!",
              content: res.locals.data,
            });
            break;

          case 4:
            res.json({
              "#data": res.locals.data,
              "#meta": res.locals.meta,
            });
            break;

          case 5:
          default:
            res.json({
              data: res.locals.data,
              meta: res.locals.meta,
            });
            break;
        }
      }
    } catch (e) {
      next(new ServerError(e));
    }
  });
};
/*

    "success": true,
    "message": "All good!",
    "content": {
        "token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNb3BrZjZDSFcxand0MVNtQll5Wmk1RFJ1MDJnUE9Uek5xRlVpYXlLOHlnIn0.eyJleHAiOjE2MTIyODAwODAsImlhdCI6MTYxMjI0NDA4MCwianRpIjoiZTkxMzMxNjItNjliZS00ZWRjLWIzZDItNWYzMTZmMDMyM2NjIiwiaXNzIjoiaHR0cHM6Ly9sZXBpZGEtZGV2LWtleWNsb2FrLnByb3hpbS5haS9hdXRoL3JlYWxtcy9wcm94aW0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNGZhNDRjNDktMTAxNS00ZWM3LTgyMDUtYzFiZWMyYTE2OTllIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicHJveGltLWFwaS1kZXYiLCJzZXNzaW9uX3N0YXRlIjoiYzY1NzAwOTUtZmQ0Zi00OTAwLTljYTItZGE1Njk2NjU1ZmYxIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiR2lvcmdvcyBUb3BzaXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJnaW9yZ29zLnRvcHNpcyIsInR5cGUiOiIxIiwiZ2l2ZW5fbmFtZSI6Ikdpb3Jnb3MiLCJmYW1pbHlfbmFtZSI6IlRvcHNpcyIsImVtYWlsIjoiZ2lvcmdvc3RvcHNpc0Bwcm90b25tYWlsLmNvbSJ9.XNqENQxdEEy_Xf0iCXuT1mU-gqcVKMq2p7l--XmS0MLDZPlGvD4cIs0MiFUm13Z1ggOvoulJbfz18Au7GzpZE3n6YD9KCzZAYx7T0b2zvNgdVkx3cmVpyjmtMxLTRPOSonFmMMTiAuV6oLBL8smJBF1Ih0td737a5naPpK7ItzQQq-LIQ0vAYhoYFspiY2_9_jMxYfsseWFLUMeiAlnHZVAMTKQnKQ6BRp3_mWFZyRaFWe4-X2rgLeWAWyzBrM7-o3yag7euOd2xBtyQdN8Zobbet551LjSp3ypJy8gVu0SmmbxrJaH_NN83_8Gy93rdTVuxa5lOvaMRcRugs9uofg",
        "type": 9,
        "uid": "giorgos.topsis",
        "config": {
            "menu": {
                "agencies": {
                    "enabled": false
                },
                "poi": {
                    "enabled": false
                },
                "clients": {
                    "enabled": false
                },
                "appkey_generation": {
                    "enabled": false
                },
                "appkey_settings": {
                    "enabled": false
                },
                "beacons": {
                    "enabled": false
                },
                "rules": {
                    "enabled": false
                },
                "network": {
                    "enabled": false
                },
                "devices": {
                    "enabled": false
                },
                "gatherings": {
                    "enabled": false
                },
                "fiscalcodes": {
                    "enabled": false
                },
                "settings": {
                    "enabled": false
                },
                "requests": {
                    "enabled": true,
                    "role": "admin"
                },
                "calendar": {
                    "enabled": true,
                    "role": "admin"
                }
            },
            "company": {
                "name": "Lepida",
                "logo": "https://dashboard-dev.reopen.lepida.it/assets/img/dappertutto.svg"
            }
        },
        "scope": "openid profile email"
    }
}
*/
