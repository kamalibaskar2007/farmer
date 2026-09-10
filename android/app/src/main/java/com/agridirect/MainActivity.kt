package com.agridirect

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent { AgriDirectMobile() }
  }
}

@Composable
fun AgriDirectMobile() {
  var role by remember { mutableStateOf("Farmer") }
  var selectedScreen by remember { mutableStateOf("Home") }

  val screens = listOf(
    "Splash", "Login", "Home", "My Products", "Add Product",
    "Marketplace", "Product Details", "Price Comparison",
    "Smart Matching", "Order Tracking", "Payment", "Profile"
  )

  MaterialTheme {
    Column(Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
      Text("AgriDirect Mobile App", style = MaterialTheme.typography.headlineMedium)
      Text("Kanyakumari, TN · SIH 2026 Direct Farmer Marketplace", style = MaterialTheme.typography.labelMedium)

      Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        FilterChip(selected = role == "Farmer", onClick = { role = "Farmer" }, label = { Text("Farmer") })
        FilterChip(selected = role == "Buyer", onClick = { role = "Buyer" }, label = { Text("Buyer") })
      }

      Text("Screen Preview:", style = MaterialTheme.typography.titleMedium)
      LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        items(screens) { screen ->
          FilterChip(
            selected = selectedScreen == screen,
            onClick = { selectedScreen = screen },
            label = { Text(screen) }
          )
        }
      }

      Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
          Text("Screen: $selectedScreen", style = MaterialTheme.typography.titleMedium)
          when (selectedScreen) {
            "Splash" -> Text("AgriDirect: From Farmer to Buyer - Fair Price for Everyone")
            "Login" -> Text("Welcome Back! Login as $role via Mobile & Password or Google OAuth")
            "Home" -> Text("Fresh Produce Direct from Farmers - Vegetables, Fruits, Grains, Dairy")
            "My Products" -> Text("Tomato (200kg - Grade A - ₹24/kg) - Live - 2 Buyers Interested")
            "Add Product" -> Text("Upload Photos, Product Name, Quantity, Grade, Expected Price")
            "Marketplace" -> Text("Fresh Produce Marketplace - Tomatoes ₹24/kg, Carrots ₹22/kg")
            "Product Details" -> Text("Tomato Grade A · Ramesh Kumar (Verified Farmer - Rating 4.8★)")
            "Price Comparison" -> Text("Mandi Comparison: Nagercoil ₹22/kg, Thiruvattar ₹20/kg, Recommended ₹23-₹25/kg")
            "Smart Matching" -> Text("Sri Venkateswara Retail Store (100kg), Hotel Sea View (50kg), Matched: 200/200kg")
            "Order Tracking" -> Text("Progress: Order Placed -> Processing -> Picked Up -> On the Way -> Delivered")
            "Payment" -> Text("Order Summary: Tomato ₹4,800 + Delivery ₹100 = ₹4,900 (UPI / Escrow Protected)")
            "Profile" -> Text("Ramesh Kumar (Farmer) - 12 Listings | 8 Orders | 4.8 Rating")
          }
        }
      }
    }
  }
}
