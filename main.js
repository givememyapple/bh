// ok-portal v0.1.0 — research skeleton for OK.ru call carrier (OpenFlux script transport)
// Not a full tunnel yet: establishes Session shape + params for cookies/opponent.
var Transport = {
  info: function () {
    return {
      name: "ok-portal",
      version: "0.1.0",
      cookieDomain: "https://ok.ru/",
      scopeCookiesToParentDomain: true,
      mtu: 0,
      reliable: false,
      ordered: false,
      halfDuplex: false,
      minIntervalMs: 0,
      params: [
        { key: "cookies", label: "OK cookies", type: "textarea", required: false, group: "Account", description: "Cookie header from logged-in ok.ru" },
        { key: "opponentId", label: "Opponent OK uid", type: "text", required: false, group: "Call", description: "Peer uid (exit uid on client)" },
        { key: "role", label: "Role hint", type: "select", options: ["auto", "exit", "client"], default: "auto", advanced: true }
      ]
    };
  },

  open: async function (cfg) {
    setState("connecting");
    try {
      var params = (cfg && cfg.params) || {};
      this._params = params;
      this._isExit = String(params.exit || params.role || "") === "true" ||
                     String(params.role || "") === "exit" ||
                     String((cfg && cfg.exit) || "") === "true";
      if (params.cookies) {
        try { cookieJar.set(params.cookies, "https://ok.ru/"); } catch (e) {}
      }
      // Research stub: mark connected so Session can start; wire OK media later.
      // Real path: getCallToken -> anonymLogin -> startConversation / VCP accept -> ws2.
      this._buf = [];
      setState("connected");
    } catch (e) {
      setState("dead", String(e));
    }
  },

  write: function (bytes) {
    // Stub: loopback would need a second peer path; drop for now.
    // Full transport will send over OK DataChannel / signaling.
  },

  close: function () {
    this._buf = [];
    setState("dead");
  }
};
