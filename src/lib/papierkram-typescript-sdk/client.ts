/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest'
import { FetchHttpRequest } from './core/FetchHttpRequest'
import type { OpenAPIConfig } from './core/OpenAPI'

import { BankingBankConnectionBankverbindungService } from './services/BankingBankConnectionBankverbindungService'
import { BankingTransactionKontoumsatzService } from './services/BankingTransactionKontoumsatzService'
import { ContactCompanyKontaktpersonService } from './services/ContactCompanyKontaktpersonService'
import { ContactCompanyUnternehmenService } from './services/ContactCompanyUnternehmenService'
import { ExpenseVoucherAusgabeBelegService } from './services/ExpenseVoucherAusgabeBelegService'
import { IncomeEstimateAngebotService } from './services/IncomeEstimateAngebotService'
import { IncomeInvoiceRechnungService } from './services/IncomeInvoiceRechnungService'
import { IncomePaymentTermZahlungsbedingungenService } from './services/IncomePaymentTermZahlungsbedingungenService'
import { IncomePropositionWareOderDienstleistungService } from './services/IncomePropositionWareOderDienstleistungService'
import { InfoService } from './services/InfoService'
import { ProjectProjektService } from './services/ProjectProjektService'
import { TrackerTaskAufgabeService } from './services/TrackerTaskAufgabeService'
import { TrackerTimeEntryZeiteintragService } from './services/TrackerTimeEntryZeiteintragService'
import { UserBenutzerService } from './services/UserBenutzerService'

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest

export class client {
  public readonly bankingBankConnectionBankverbindung: BankingBankConnectionBankverbindungService
  public readonly bankingTransactionKontoumsatz: BankingTransactionKontoumsatzService
  public readonly contactCompanyKontaktperson: ContactCompanyKontaktpersonService
  public readonly contactCompanyUnternehmen: ContactCompanyUnternehmenService
  public readonly expenseVoucherAusgabeBeleg: ExpenseVoucherAusgabeBelegService
  public readonly incomeEstimateAngebot: IncomeEstimateAngebotService
  public readonly incomeInvoiceRechnung: IncomeInvoiceRechnungService
  public readonly incomePaymentTermZahlungsbedingungen: IncomePaymentTermZahlungsbedingungenService
  public readonly incomePropositionWareOderDienstleistung: IncomePropositionWareOderDienstleistungService
  public readonly info: InfoService
  public readonly projectProjekt: ProjectProjektService
  public readonly trackerTaskAufgabe: TrackerTaskAufgabeService
  public readonly trackerTimeEntryZeiteintrag: TrackerTimeEntryZeiteintragService
  public readonly userBenutzer: UserBenutzerService

  public readonly request: BaseHttpRequest

  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = FetchHttpRequest,
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? 'https://felixvemmer.papierkram.de/api/v1',
      VERSION: config?.VERSION ?? '1',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    })

    this.bankingBankConnectionBankverbindung = new BankingBankConnectionBankverbindungService(
      this.request,
    )
    this.bankingTransactionKontoumsatz = new BankingTransactionKontoumsatzService(this.request)
    this.contactCompanyKontaktperson = new ContactCompanyKontaktpersonService(this.request)
    this.contactCompanyUnternehmen = new ContactCompanyUnternehmenService(this.request)
    this.expenseVoucherAusgabeBeleg = new ExpenseVoucherAusgabeBelegService(this.request)
    this.incomeEstimateAngebot = new IncomeEstimateAngebotService(this.request)
    this.incomeInvoiceRechnung = new IncomeInvoiceRechnungService(this.request)
    this.incomePaymentTermZahlungsbedingungen = new IncomePaymentTermZahlungsbedingungenService(
      this.request,
    )
    this.incomePropositionWareOderDienstleistung =
      new IncomePropositionWareOderDienstleistungService(this.request)
    this.info = new InfoService(this.request)
    this.projectProjekt = new ProjectProjektService(this.request)
    this.trackerTaskAufgabe = new TrackerTaskAufgabeService(this.request)
    this.trackerTimeEntryZeiteintrag = new TrackerTimeEntryZeiteintragService(this.request)
    this.userBenutzer = new UserBenutzerService(this.request)
  }
}
