
import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/integrations/supabase/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }

  try {
    const { email, services, points, marketingConsent } = req.body

    // Store the package request in Supabase
    const { data: packageRequest, error: dbError } = await supabase
      .from("package_requests")
      .insert([
        {
          email,
          services,
          points,
          marketing_consent: marketingConsent,
          status: "pending"
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      return res.status(500).json({ 
        success: false, 
        message: "Failed to store package request",
        error: dbError.message 
      })
    }

    // Send notification email to admin
    const notificationResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({
          to: "vincent@vincialmedia.com", // Admin email
          subject: "New Package Request - Vincialmedia",
          packageRequest
        })
      }
    )

    if (!notificationResponse.ok) {
      console.error("Admin notification failed:", await notificationResponse.text())
    }

    // Send confirmation email to customer
    const confirmationResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-customer-confirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({
          packageRequest
        })
      }
    )

    if (!confirmationResponse.ok) {
      console.error("Customer confirmation failed:", await confirmationResponse.text())
    }

    // Return success even if emails fail - we have the data stored
    return res.status(200).json({
      success: true,
      message: "Package request submitted successfully",
      data: packageRequest
    })

  } catch (error) {
    console.error("Error in submit-package handler:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    })
  }
}
