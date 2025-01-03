/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'

export class ExpenseVoucherAusgabeBelegService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Upload a document for a voucher
   * Cost in API Credits: 10
   * @returns any Document uploaded
   * @throws ApiError
   */
  public postExpenseVouchersDocuments({
    voucherId,
    formData,
  }: {
    voucherId: number
    formData?: {
      file?: Blob
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/expense/vouchers/{voucher_id}/documents',
      path: {
        voucher_id: voucherId,
      },
      formData: formData,
      mediaType: 'multipart/form-data',
    })
  }

  /**
   * Delete a document
   * Cost in API Credits: 1
   * @returns void
   * @throws ApiError
   */
  public deleteExpenseVouchersDocuments({
    id,
    voucherId,
  }: {
    /**
     * The id of the document
     */
    id: string
    /**
     * The id of the voucher
     */
    voucherId: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/expense/vouchers/{voucher_id}/documents/{id}',
      path: {
        id: id,
        voucher_id: voucherId,
      },
      errors: {
        404: `The specified document was not found`,
      },
    })
  }

  /**
   * List all vouchers
   * Cost in API Credits: 1
   * @returns any List of vouchers
   * @throws ApiError
   */
  public getExpenseVouchers({
    page,
    pageSize,
    orderBy,
    orderDirection,
    creditorId,
    projectId,
    documentDateRangeStart,
    documentDateRangeEnd,
  }: {
    /**
     * Page number
     */
    page?: number
    /**
     * Page size (1-100)
     */
    pageSize?: number
    /**
     * Order by field (must be used with order_direction)
     */
    orderBy?: string
    /**
     * Order direction (must be used with order_by)
     */
    orderDirection?: Array<'asc' | 'desc'>
    /**
     * Filter by creditor (company) id
     */
    creditorId?: number
    /**
     * Filter by project id
     */
    projectId?: number
    /**
     * Filter by document date. Beginning of date range.
     */
    documentDateRangeStart?: string
    /**
     * Filter by document date. End of date range.
     */
    documentDateRangeEnd?: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/expense/vouchers',
      query: {
        page: page,
        page_size: pageSize,
        order_by: orderBy,
        order_direction: orderDirection,
        creditor_id: creditorId,
        project_id: projectId,
        document_date_range_start: documentDateRangeStart,
        document_date_range_end: documentDateRangeEnd,
      },
    })
  }

  /**
   * Create a voucher
   * Cost in API Credits: 50
   * @returns any Voucher created
   * @throws ApiError
   */
  public postExpenseVouchers({
    requestBody,
  }: {
    requestBody?: {
      name: string
      due_date?: string | null
      document_date?: string | null
      description?: string | null
      entertainment_reason?: string | null
      flagged?: boolean | null
      provenance: string
      entertainment_persons?: Array<string | null> | null
      creditor?: {
        id?: number
      }
      line_items: Array<{
        amount?: number | null
        name?: string | null
        vat_rate: string
        category?:
          | 'Andere Anlagen'
          | 'Betriebsausstattung (Anlage)'
          | 'Büroeinrichtung'
          | 'Fahrzeuge (PKW)'
          | 'Geschäftsausstattung'
          | 'Grundstücke'
          | 'GWG ab 2018: 250 bis 1000 EUR (Sammelposten)'
          | 'GWG ab 2018: bis 800 EUR (Geringwertiges Wirtschaftsgut)'
          | 'GWG vor 2018: 150 bis 1000 EUR (Sammelposten)'
          | 'GWG vor 2018: bis 410 EUR (Geringwertiges Wirtschaftsgut)'
          | 'Sofortabschreibung ab 2021: PC, Laptop und andere Computer-Hardware'
          | 'Software (Anlage)'
          | 'Technische Anlagen und Maschinen'
          | 'Aufwendungen für ein häusliches Arbeitszimmer'
          | 'Ausgangsfrachten'
          | 'Betriebsbedarf'
          | 'Bewirtungskosten'
          | 'Bezugsnebenkosten'
          | 'Buchführungskosten'
          | 'Büroartikel'
          | 'Bürobedarf'
          | 'Fahrten zwischen Wohnung und Betriebsstätte und Familienheimfahrten (abziehbarer Anteil)'
          | 'Fahrten zwischen Wohnung und Betriebsstätte und Familienheimfahrten (nicht abziehbarer Anteil)'
          | 'Fahrtkostenerstatt. Whg./Arbeitsstätte'
          | 'Fortbildung'
          | 'Fremdleistung (Dienstleistung)'
          | 'Garagenmieten'
          | 'Gas, Strom, Wasser'
          | 'Gehälter'
          | 'Geschenke bis 35 Euro'
          | 'Geschenke über 35 Euro'
          | 'Geschäftsessen'
          | 'Gesetzliche Sozialaufwendungen'
          | 'Gewerbesteuer'
          | 'Gewerbesteuer Nachzahlung oder Erstattung'
          | 'Grundsteuer'
          | 'Heizung'
          | 'Kfz-Reparaturen'
          | 'Kfz-Steuern'
          | 'Kfz-Versicherungen'
          | 'Körperschaftsteuer'
          | 'Laufende Kfz-Betriebskosten'
          | 'Leasing'
          | 'Leergut'
          | 'Löhne'
          | 'Miete'
          | 'Mietleasing bewegliche Wirtschaftsgüter für technische Anlagen und Maschinen'
          | 'Nebenkosten des Geldverkehrs'
          | 'Nicht abzugsfähige Bewirtungskosten'
          | 'Porto'
          | 'Rechts- und Beratungskosten'
          | 'Reinigung'
          | 'Reisekosten Arbeitnehmer'
          | 'Reisekosten Arbeitnehmer Fahrtkosten'
          | 'Reisekosten Arbeitnehmer Verpflegungsmehraufwand'
          | 'Reisekosten Arbeitnehmer Übernachtungsaufwand'
          | 'Reisekosten UN Verpfleg.mehraufwand'
          | 'Reisekosten UN Übernachtungsaufwand'
          | 'Reisekosten Unternehmer'
          | 'Reisekosten Unternehmer Fahrtkosten'
          | 'Reparatur/Instandh. Betriebs- u. Gesch.'
          | 'Repräsentationskosten'
          | 'Roh-, Hilfs- und Betriebsstoffe'
          | 'Software/EDV (Büroartikel)'
          | 'Sonstige betriebliche Aufwendungen'
          | 'Sonstige Kfz-Kosten'
          | 'Spesen (Reisekosten Unternehmer)'
          | 'Telefon'
          | 'Verkaufsprovisionen'
          | 'Versicherungen'
          | 'Wareneingang'
          | 'Werbekosten'
          | 'Zeitschriften, Bücher'
          | 'Zinsabschlagsteuer'
          | 'Zinsen und ähnliche Aufwendungen'
          | 'Zuwendungen,Spenden steuerl. n. abziehb.'
          | 'Erlöse Leergut'
          | 'Private KFZ Nutzung (1% Regel)'
          | 'Private Verwendung von Gegenständen'
          | 'Privatentnahme Waren / Gegenstände'
          | 'Provisionserlöse'
          | 'Sonstige Einnahme (Erlöse)'
          | 'Zinsen und ähnliche Erträge'
          | 'Zuschüsse'
          | 'Privateinlagen'
          | 'Privatentnahmen allgemein'
          | 'Umsatzsteuer Erstattung (nur EÜR)'
          | 'Umsatzsteuer frühere Jahre'
          | 'Umsatzsteuer Vorjahr'
          | 'Umsatzsteuervorauszahlungen'
          | 'Umsatzsteuervorauszahlungen 1/11'
          | 'Umsatzsteuer Erstattung'
          | 'Umsatzsteuer Erstattung frühere Jahre'
          | 'Umsatzsteuervorauszahlung Guthaben'
          | null
        billing?: {
          amount?: number | null
          vat_rate?: string
          invoice?: {
            id?: number
          }
          project?: {
            id?: number
          } | null
        } | null
        depreciation?: {
          afa: {
            number: string | null
          }
          life_years?: number | null
        } | null
      }> | null
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/expense/vouchers',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Voucher could not be created`,
      },
    })
  }

  /**
   * Retrieves a voucher
   * Cost in API Credits: 1
   * @returns any Show voucher
   * @throws ApiError
   */
  public getExpenseVouchers1({
    id,
  }: {
    /**
     * The id of the voucher
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/expense/vouchers/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified voucher was not found`,
      },
    })
  }

  /**
   * Update a voucher
   * Cost in API Credits: 1
   * @returns any Voucher updated
   * @throws ApiError
   */
  public putExpenseVouchers({
    id,
    requestBody,
  }: {
    /**
     * The id of the voucher
     */
    id: string
    requestBody?: {
      name?: string | null
      due_date?: string | null
      document_date?: string | null
      description?: string | null
      entertainment_reason?: string | null
      flagged?: boolean | null
      provenance?: string | null
      entertainment_persons?: Array<string | null> | null
      creditor?: {
        id?: number
      }
      line_items?: Array<{
        amount?: number | null
        name?: string | null
        vat_rate: string
        category?:
          | 'Andere Anlagen'
          | 'Betriebsausstattung (Anlage)'
          | 'Büroeinrichtung'
          | 'Fahrzeuge (PKW)'
          | 'Geschäftsausstattung'
          | 'Grundstücke'
          | 'GWG ab 2018: 250 bis 1000 EUR (Sammelposten)'
          | 'GWG ab 2018: bis 800 EUR (Geringwertiges Wirtschaftsgut)'
          | 'GWG vor 2018: 150 bis 1000 EUR (Sammelposten)'
          | 'GWG vor 2018: bis 410 EUR (Geringwertiges Wirtschaftsgut)'
          | 'Sofortabschreibung ab 2021: PC, Laptop und andere Computer-Hardware'
          | 'Software (Anlage)'
          | 'Technische Anlagen und Maschinen'
          | 'Aufwendungen für ein häusliches Arbeitszimmer'
          | 'Ausgangsfrachten'
          | 'Betriebsbedarf'
          | 'Bewirtungskosten'
          | 'Bezugsnebenkosten'
          | 'Buchführungskosten'
          | 'Büroartikel'
          | 'Bürobedarf'
          | 'Fahrten zwischen Wohnung und Betriebsstätte und Familienheimfahrten (abziehbarer Anteil)'
          | 'Fahrten zwischen Wohnung und Betriebsstätte und Familienheimfahrten (nicht abziehbarer Anteil)'
          | 'Fahrtkostenerstatt. Whg./Arbeitsstätte'
          | 'Fortbildung'
          | 'Fremdleistung (Dienstleistung)'
          | 'Garagenmieten'
          | 'Gas, Strom, Wasser'
          | 'Gehälter'
          | 'Geschenke bis 35 Euro'
          | 'Geschenke über 35 Euro'
          | 'Geschäftsessen'
          | 'Gesetzliche Sozialaufwendungen'
          | 'Gewerbesteuer'
          | 'Gewerbesteuer Nachzahlung oder Erstattung'
          | 'Grundsteuer'
          | 'Heizung'
          | 'Kfz-Reparaturen'
          | 'Kfz-Steuern'
          | 'Kfz-Versicherungen'
          | 'Körperschaftsteuer'
          | 'Laufende Kfz-Betriebskosten'
          | 'Leasing'
          | 'Leergut'
          | 'Löhne'
          | 'Miete'
          | 'Mietleasing bewegliche Wirtschaftsgüter für technische Anlagen und Maschinen'
          | 'Nebenkosten des Geldverkehrs'
          | 'Nicht abzugsfähige Bewirtungskosten'
          | 'Porto'
          | 'Rechts- und Beratungskosten'
          | 'Reinigung'
          | 'Reisekosten Arbeitnehmer'
          | 'Reisekosten Arbeitnehmer Fahrtkosten'
          | 'Reisekosten Arbeitnehmer Verpflegungsmehraufwand'
          | 'Reisekosten Arbeitnehmer Übernachtungsaufwand'
          | 'Reisekosten UN Verpfleg.mehraufwand'
          | 'Reisekosten UN Übernachtungsaufwand'
          | 'Reisekosten Unternehmer'
          | 'Reisekosten Unternehmer Fahrtkosten'
          | 'Reparatur/Instandh. Betriebs- u. Gesch.'
          | 'Repräsentationskosten'
          | 'Roh-, Hilfs- und Betriebsstoffe'
          | 'Software/EDV (Büroartikel)'
          | 'Sonstige betriebliche Aufwendungen'
          | 'Sonstige Kfz-Kosten'
          | 'Spesen (Reisekosten Unternehmer)'
          | 'Telefon'
          | 'Verkaufsprovisionen'
          | 'Versicherungen'
          | 'Wareneingang'
          | 'Werbekosten'
          | 'Zeitschriften, Bücher'
          | 'Zinsabschlagsteuer'
          | 'Zinsen und ähnliche Aufwendungen'
          | 'Zuwendungen,Spenden steuerl. n. abziehb.'
          | 'Erlöse Leergut'
          | 'Private KFZ Nutzung (1% Regel)'
          | 'Private Verwendung von Gegenständen'
          | 'Privatentnahme Waren / Gegenstände'
          | 'Provisionserlöse'
          | 'Sonstige Einnahme (Erlöse)'
          | 'Zinsen und ähnliche Erträge'
          | 'Zuschüsse'
          | 'Privateinlagen'
          | 'Privatentnahmen allgemein'
          | 'Umsatzsteuer Erstattung (nur EÜR)'
          | 'Umsatzsteuer frühere Jahre'
          | 'Umsatzsteuer Vorjahr'
          | 'Umsatzsteuervorauszahlungen'
          | 'Umsatzsteuervorauszahlungen 1/11'
          | 'Umsatzsteuer Erstattung'
          | 'Umsatzsteuer Erstattung frühere Jahre'
          | 'Umsatzsteuervorauszahlung Guthaben'
          | null
        billing?: {
          amount?: number | null
          vat_rate?: string
          invoice?: {
            id?: number
          }
          project?: {
            id?: number
          } | null
        } | null
        depreciation?: {
          afa: {
            number: string | null
          }
          life_years?: number | null
        } | null
      }> | null
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/expense/vouchers/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `The specified voucher was not found`,
        422: `The specified voucher cannot be edited anymore`,
      },
    })
  }

  /**
   * Delete a voucher
   * Cost in API Credits: 1
   * @returns void
   * @throws ApiError
   */
  public deleteExpenseVouchers({
    id,
  }: {
    /**
     * The id of the voucher
     */
    id: string
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/expense/vouchers/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `The specified voucher was not found`,
      },
    })
  }

  /**
   * Archive a voucher
   * Cost in API Credits: 1
   * @returns any Voucher archived
   * @throws ApiError
   */
  public postExpenseVouchersArchive({
    id,
  }: {
    /**
     * The id of the voucher
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/expense/vouchers/{id}/archive',
      path: {
        id: id,
      },
    })
  }

  /**
   * Unarchive a voucher
   * Cost in API Credits: 1
   * @returns any Voucher unarchived
   * @throws ApiError
   */
  public postExpenseVouchersUnarchive({
    id,
  }: {
    /**
     * The id of the voucher
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/expense/vouchers/{id}/unarchive',
      path: {
        id: id,
      },
    })
  }

  /**
   * Cancel a voucher
   * Cost in API Credits: 1
   * @returns any Voucher canceled
   * @throws ApiError
   */
  public postExpenseVouchersCancel({
    id,
  }: {
    /**
     * The id of the voucher
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/expense/vouchers/{id}/cancel',
      path: {
        id: id,
      },
      errors: {
        422: `The specified voucher cannot be canceled`,
      },
    })
  }

  /**
   * Cancel a voucher with reverse entry ("Generalumkehr")
   * Cost in API Credits: 1
   * @returns any Voucher canceled
   * @throws ApiError
   */
  public postExpenseVouchersCancelWithReverseEntry({
    id,
  }: {
    /**
     * The id of the voucher
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/expense/vouchers/{id}/cancel_with_reverse_entry',
      path: {
        id: id,
      },
      errors: {
        422: `The specified voucher cannot be canceled with reverse entry`,
      },
    })
  }

  /**
   * Mark a voucher as paid
   * Cost in API Credits: 1
   * @returns any Pay a voucher (without a bank connection)
   * @throws ApiError
   */
  public postExpenseVouchersPay({
    id,
    requestBody,
  }: {
    /**
     * The id of the voucher
     */
    id: string
    requestBody?: {
      payment_date?: string | null
      value?: number | null
      banking_transaction?: {
        id?: number
      }
      difference_reason?: 'sonstige' | 'mahnung' | 'teilzahlung' | 'skonto' | 'schmaelerung' | null
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/expense/vouchers/{id}/pay',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Voucher is in incorrect state`,
      },
    })
  }

  /**
   * Retrieves an expense voucher as a PDF
   * @returns any Return pdf
   * @throws ApiError
   */
  public getExpenseVouchersPdf({
    id,
  }: {
    /**
     * The id of the expense voucher
     */
    id: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/expense/vouchers/{id}/pdf',
      path: {
        id: id,
      },
    })
  }
}
