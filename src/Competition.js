export const COMPETITION_TYPES = {
  'SIMPLE'             : 'SIMPLE',
  'QUESTION'           : 'QUESTION',
  'QUESTION_WITH_PRIZE': 'QUESTION_WITH_PRIZE'
};

export class Competition {
  constructor(name = 'My competition') {
    this.id = null;
    this.type = COMPETITION_TYPES.SIMPLE;
    this.name = name;
    this.uri = null;
    this.startDate = null;
    this.endDate = null;
    this.bannerImageUrlSmall = null;
    this.bannerImageUrlMedium = null;
    this.bannerImageUrlLarge = null;
    this.heroImageUrlLarge = null;
    this.heroImageUrlSmall = null;

    this.primaryColour = null;
    this.text = null;
    this.emailName = null;
    this.additionalTerms = null;
    this.successMessage = null;

    this.sections = []

    // View properties
    this.allowsMultipleEntries = false;
  }
}

export class Section {
  constructor() {
    this.id = null;
    this.prizeGroup = null;
    this.question = null;
    this.merchantId = null;
    this.offerId = null;

    this.uri = null;
    this.name = null;

    this.startDate = null;
    this.endDate = null;

    this.bannerImageUrlSmall = null;
    this.bannerImageUrlMedium = null;
    this.bannerImageUrlLarge = null;
    this.heroImageUrlLarge = null;
    this.heroImageUrlSmall = null;

    this.text = null;
    this.emailName = null;

    this.deleted = false;
  }
}

export class PrizeGroup {
  constructor() {
    this.name = null;
    this.maximumPrizeCount = null;
    this.strategy = null;
    this.prizes = [];
  }
}

export class Prize {
  constructor() {
    this.name = null;
    this.code = null;
    this.emailName = null;
    this.isClaimed = false;
  }
}

export class Question {
  constructor() {
    this.questionType = null;
    this.content = null;
    this.answer = null;
    this.imageUrl = null;
    this.clue = null;
    this.possibleAnswers = [];
    this.cssSelector = null;
    this.merchantId = null;
  }
}
