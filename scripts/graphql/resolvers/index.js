const resolvers = {
  hentSaksopplysninger: (args, obj, context, info) => {
    return {
      behandlingID: args.behandlingID,
      persondata: {
        statsborgerskap: [
          {
            land: "NOR",
            bekreftelsesdato: null,
            gyldigFraOgMed: "1990-01-01",
            gyldigTilOgMed: null,
            master: "PDL",
            kilde: "Folkeregisteret",
            erHistorisk: false,
          },
          {
            land: "NOR",
            bekreftelsesdato: null,
            gyldigFraOgMed: "1990-01-01",
            gyldigTilOgMed: null,
            master: "PDL",
            kilde: "Folkeregisteret",
            erHistorisk: true,
          },
        ],
      },
    };
  },
};

module.exports = resolvers;
